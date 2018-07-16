define(['common/config', 'common/hasEvents'], function(Config, HasEvents) {

  var ICONS = {
    point : '&#xf05b',
    rect  : '<span class="rect"></span>',
    tbox  : '<span class="tilted-box"></span>',
    lbox  : '<span class="linked-box"></span>'
  };

  var Toolbar = function() {
    var self = this,

        tools = jQuery('.tools'),
        toolMenu = tools.find('.has-submenu'),
        toolMenuIcon = tools.find('.has-submenu > .icon'),
        toolMenuLabel = tools.find('.has-submenu > .label'),
        toolMenuDropdown = toolMenu.find('.submenu'),

        currentTool = 'MOVE',

        changeColor = jQuery('.change-color'),

        toggleOverlays = changeColor.find('.visibility'),

        imagePane = jQuery('#image-pane'),

        initDropdownMenus = function() {
          var colorPickerContainer = changeColor.find('.colorpicker').hide();

          if (Config.writeAccess) {
              toolMenuDropdown.hide();
              toolMenu.hover(
                function() { toolMenuDropdown.show(); },
                function() { toolMenuDropdown.hide(); });
          } else {
            // Read-only mode
            toolMenu.addClass('disabled');
          }

          changeColor.hover(
            function() { colorPickerContainer.show(); },
            function() { colorPickerContainer.hide(); });

          changeColor.colorpicker({
            color: 'rgba(50, 50, 50, 0.2)',
            inline: true,
            container: changeColor.find('.colorpicker li.palette')
          }).on('changeColor', function(e) {
            var color = jQuery.extend({}, e.color.toRGB(), { hex: e.color.toHex() });
            self.fireEvent('overlayColorChanged', color);
          });

          toggleOverlays.click(onToggleOverlays);
        },

        onToggleOverlays = function() {
          var isChecked = toggleOverlays.hasClass('checked');
          toggleOverlays.toggleClass('checked');
          self.fireEvent('toggleOverlays');
        },

        setTool = function(toolLabel, toolKey) {
          tools.find('.active').removeClass('active');

          if (toolKey === 'move') {
            tools.find('[data-tool-key="move"]').addClass('active');
          } else {
            // Submenu selection
            toolMenu.addClass('active');
            toolMenu.data('tool-label', toolLabel);
            toolMenu.data('tool-key', toolKey);
            toolMenuIcon.html(ICONS[toolKey]);
            toolMenuLabel.html(toolLabel);
          }

          imagePane.attr('class', toolKey);
          currentTool = toolKey;

          self.fireEvent('toolChanged', toolKey);
        },

        attachClickHandlers = function() {
          var attachToolHandler = function() {
                tools.on('click', 'li', function(e) {
                  var item = jQuery(e.target).closest('li'),
                      toolLabel = item.data('tool-label'),
                      toolKey = item.data('tool-key');

                  if (item.hasClass('disabled'))
                    return;

                  if (toolKey !== currentTool)
                    setTool(toolLabel, toolKey);

                  return false; // Prevent events from parent LIs
                });
              },

              attachHelpHandler = function() {
                jQuery('.help').click(toggleHelp);
              };

          attachToolHandler();
          attachHelpHandler();
        },

        toggleHelp = function() {
          self.fireEvent('toggleHelp');
        },

        toggleTool = function() {
          var activeMode = tools.find('.active').data('tool-key'),
              selectedToolLabel = toolMenu.data('tool-label'),
              selectedToolKey = toolMenu.data('tool-key');

          if (activeMode === 'move')
            setTool(selectedToolLabel, selectedToolKey);
          else
            setTool('MOVE', 'move');
        },

        onKeyDown = function(e) {
          var key = e.which,
              isEventFromEditor =
                jQuery(e.target).closest('.annotation-editor-popup').length > 0 ||
                jQuery(e.target).closest('.georesolution-panel').length > 0;

          // We ignore keypresses while the user is typing on the editor
          if (!isEventFromEditor) {
            if (key === 32) { // SPACE - toggle MOVE/annotation tool
              if (Config.writeAccess)
                toggleTool();
            } else if (key == 112) { // F1
              toggleHelp();
              return false; // To prevent browser help from popping up
            } else if (e.altKey && key === 86) { // Alt + V
              onToggleOverlays();
            }
          }
        };

    initDropdownMenus();
    attachClickHandlers();

    jQuery(window).keydown(onKeyDown);

    HasEvents.apply(this);
  };
  Toolbar.prototype = Object.create(HasEvents.prototype);

  return Toolbar;

});
