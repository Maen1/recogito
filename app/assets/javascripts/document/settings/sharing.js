require.config({
  baseUrl: "/assets/javascripts/",
  fileExclusionRegExp: /^lib$/
});

require(['common/config'], function(Config) {

  jQuery(document).ready(function() {
    var permissionSelector = jQuery(
          '<div class="permission-selector">' +
            '<h3>Permission Level<span class="close outline-icon">&#xe897;</close></h3>' +
            '<ul>' +
              '<li class="READ">' +
                '<div class="checked"><div class="icon"></div></div>' +
                '<h4>Read</h4>' +
                '<p>Collaborators can read document and annotations, but not edit.</p>' +
              '</li>' +
              '<li class="WRITE">' +
                '<div class="checked"><div class="icon"></div></div>' +
                '<h4>Write</h4>' +
                '<p>Collaborators can read document and annotations, create new annotations, add and reply to comments.</p>' +
              '</li>' +
              '<li class="ADMIN">' +
                '<div class="checked"><div class="icon"></div></div>' +
                '<h4>Admin</h4>' +
                '<p>Admins can edit document metadata, invite other collaborators, backup and restore, and roll back the edit history.</p>' +
              '</li>' +
            '</ul>' +
          '</div>'),

        publicVisibilityForm = jQuery('#public-visibility'),
        publicAccessLink = jQuery("#public-link"),
        publicAccessLevel = jQuery('.access-level select'),

        noCollaboratorsMessage = jQuery('.no-collaborators'),
        collaboratorsTable = jQuery('.collaborators'),
        addCollaboratorForm = jQuery('.add-collaborators form'),
        addCollaboratorInput = addCollaboratorForm.find('input'),

        closePermissionButton = permissionSelector.find('.close'),

        currentCollaborator = false,

        initAutosuggest = function() {
          addCollaboratorInput.typeahead({
            hint: false,
            highlight: false,
            minLength: 3
          }, {
            source: function(query, syncCallback, asyncCallback) {
              // Remove current user and users that are already collaborators
              var toRemove = getCollaborators();
              toRemove.push(Config.me);

              jsRoutes.controllers.document.settings.SettingsController.searchUsers(Config.documentId, query)
                .ajax().done(function(results) {
                  var filtered = jQuery.grep(results, function(username) {
                    return toRemove.indexOf(username) == -1;
                  });
                  asyncCallback(filtered);
                });
            }
          });

          addCollaboratorInput.on('typeahead:selected', function(e) {
            addCollaboratorForm.submit();
          });
        },

        getCollaborators = function() {
          return jQuery.map(collaboratorsTable.find('tr'), function(tr) {
            return tr.dataset.username;
          });
        },

        getCollaboratorForRow = function(tr) {
          return {
            collaborator: username = tr.data('username'),
            access_level: tr.data('level')
          };
        },

        getRowForCollaborator = function(username) {
          var rows = jQuery.grep(collaboratorsTable.find('tr'), function(tr) {
            return jQuery(tr).data('username') === username;
          });

          if (rows.length > 0)
            return jQuery(rows[0]);
          else
            return false;
        },

        onChangePublicVisiblity = function() {
          var radio = publicVisibilityForm.find('input:checked'),
              notifier = radio.next().find('.save-notifier'),

              accessSettings = jQuery('.access-level'),
              select = accessSettings.find('select'),

              value = radio.val();

          if (value === 'PRIVATE') {
            accessSettings.addClass('disabled');
            select.attr('disabled', true);
          } else {
            accessSettings.removeClass('disabled');
            select.removeAttr('disabled');
          }

          jsRoutes.controllers.document.settings.SettingsController.setPublicVisibility(Config.documentId, value)
            .ajax().done(function() {
              notifier.show();
              setTimeout(function() { notifier.fadeOut(200); }, 1000);
            });
        },

        onChangePublicAccessLevel = function() {
          var value = publicAccessLevel.val(),
              notifier = jQuery('.access-level .save-notifier');

          jsRoutes.controllers.document.settings.SettingsController.setPublicAccessLevel(Config.documentId, value)
            .ajax().done(function() {
              notifier.show();
              setTimeout(function() { notifier.fadeOut(200); }, 1000);
            });
        },

        togglePermissions = function(e) {
          var button = jQuery(e.target).closest('button'),
              td = button.closest('td'),
              collaborator = getCollaboratorForRow(button.closest('tr')),
              position = button.position();

          if (permissionSelector.is(':visible')) {
            closePermissions();
          } else {
            // Remember collaborator for later
            currentCollaborator = collaborator;

            // Set checkmark
            permissionSelector.find('.icon').empty();
            permissionSelector.find('.' + collaborator.access_level + ' .icon').html('&#xf00c;');

            // Set position
            td.append(permissionSelector);
            permissionSelector.show();
          }
        },

        closePermissions = function() {
          permissionSelector.hide();
        },

        clearCollaboratorInput = function() {
          addCollaboratorInput.blur();
          addCollaboratorInput.val('');
        },

        addCollaborator = function(e) {
          // Convert form data to object
          var data = addCollaboratorForm.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
          }, {});

          jsRoutes.controllers.document.settings.SettingsController.addCollaborator(Config.documentId).ajax({
            contentType: 'application/json',
            data: JSON.stringify(data)
          }).done(function(result) {
            if (result.new_collaborator) {
              var collabHome = jsRoutes.controllers.my.WorkspaceController.workspace(result.collaborator).url,
                  row = '<tr data-username="' + result.collaborator + '" data-level="' + result.access_level + '">' +
                          '<td class="col-user">' +
                            '<a href="' + collabHome + '">' + result.collaborator + '</a>' +
                          '</td>' +
                          '<td class="col-permissions">' +
                            '<button class="permissions btn small">' +
                              '<span class="label">' + result.access_level + '</span>' +
                              '<span class="icon">&#xf0dd;</span>' +
                            '</button>' +
                          '</td>' +
                          '<td class="col-actions outline-icon remove-collaborator">&#xe897;</td>' +
                        '</tr>';

              closePermissions();
              noCollaboratorsMessage.hide();
              collaboratorsTable.append(row);
              clearCollaboratorInput();
            }
          });

          // TODO what in case of failure?

          e.preventDefault();
          return false;
        },

        removeCollaborator = function(e) {
          var username = jQuery(e.target).closest('tr').data('username');
          jsRoutes.controllers.document.settings.SettingsController.removeCollaborator(Config.documentId, username)
            .ajax().done(function() {
              var row = jQuery('tr[data-username="' + username + '"]');
              row.remove();

              if (collaboratorsTable.find('tr').length === 0)
                noCollaboratorsMessage.show();
            });

            // TODO what in case of failure?

        },

        changePermissionLevel = function(e) {
          var level = jQuery(e.target).closest('li').attr('class');
          if (currentCollaborator && currentCollaborator.access_level != level) {
            jsRoutes.controllers.document.settings.SettingsController.addCollaborator(Config.documentId).ajax({
              contentType: 'application/json',
              data: JSON.stringify({ collaborator: currentCollaborator.collaborator, access_level: level })
            }).done(function(result) {
              var row = getRowForCollaborator(result.collaborator),
                  button = row.find('.permissions .label');

              currentCollaborator = false;
              row.data('level', result.access_level);
              button.html(result.access_level);
              permissionSelector.hide();
            });
          }
        },

        onDocumentKeyup = function(e) {
          if (e.which === 27) // ESC
            closePermissions();
        },

        onDocumentClick = function(e) {
          // Check if the click was outside the permissions selector & close if necessary
          var isOutside = jQuery(e.target).closest('.permission-selector, .permissions').length === 0;
          if (isOutside && permissionSelector.is(':visible'))
            closePermissions();
        };

    // Public access panel
    publicVisibilityForm.change(onChangePublicVisiblity);
    publicAccessLink.focus(function() { jQuery(this).select(); } );
    publicAccessLevel.change(onChangePublicAccessLevel);

    // Add collaborators panel
    initAutosuggest();
    permissionSelector.hide();
    permissionSelector.on('click', 'li', changePermissionLevel);
    closePermissionButton.click(closePermissions);

    collaboratorsTable.on('click', '.remove-collaborator', removeCollaborator);
    collaboratorsTable.on('click', '.permissions', togglePermissions);
    addCollaboratorForm.submit(addCollaborator);

    // Global events
    jQuery(document).keyup(onDocumentKeyup);
    jQuery(document).on('click', ':not(> .permission-selector)', onDocumentClick);
  });

});
