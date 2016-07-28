define([
  'document/annotation/text/editor/georesolution/searchresultCard',
  'common/ui/formatting',
  'common/utils/placeUtils',
  'common/api',
  'common/hasEvents',
  'common/map'], function(ResultCard, Formatting, PlaceUtils, API, HasEvents, Map) {

  var GeoresolutionPanel = function() {

    var self = this,

        element = (function() {
            var el = jQuery(
              '<div class="clicktrap">' +
                '<div class="modal-wrapper">' +
                  '<div class="modal georesolution-panel">' +
                    '<div class="modal-header">' +
                      '<div class="georesolution-search">' +
                        '<input class="search inline" type="text" placeholder="Search for a Place..." />' +
                        '<button class="search icon">&#xf002;</button>' +
                      '</div>' +
                      '<div class="flag-this-place">' +
                        'Can\'t find the right match?' +
                        '<span class="flag">' +
                          '<button class="outline-icon nostyle">&#xe842;</button>' +
                          '<span class="label">Flag this place</span>' +
                        '</span>' +
                      '</div>' +
                      '<button class="nostyle outline-icon cancel">&#xe897;</button>' +
                    '</div>' +
                    '<div class="modal-body">' +
                      '<div class="georesolution-sidebar">' +
                        '<div class="result-header"></div>' +
                        '<div class="result-list">' +
                          '<ul></ul>' +
                          '<div class="wait-for-next">' +
                            '<img src="/assets/images/wait-circle.gif">' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                      '<div class="map"></div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>');

            el.find('.wait-for-next').hide();
            el.hide();
            jQuery(document.body).append(el);
            return el;
          })(),

          searchInput     = element.find('.search'),

          btnFlag         = element.find('.flag'),
          btnCancel       = element.find('.cancel'),

          resultHeader    = element.find('.result-header'),
          resultContainer = element.find('.result-list'),
          resultList      = element.find('.result-list ul'),
          waitForNext     = element.find('.wait-for-next'),

          placeBody = false,

          currentSearchResults = [],
          currentSearchResultsTotal,

          map = new Map(element.find('.map')),

          openPopup = function(marker, place) {
            var popup = jQuery(
                  '<div class="popup">' +
                    '<div class="popup-header">' +
                      '<h3>' + place.labels.join(', ') + '</h3>' +
                    '</div>' +
                    '<div class="popup-choices"><table class="gazetteer-records"></table></div>' +
                  '</div>');

            place.is_conflation_of.reduce(function(previousShortcode, record) {
              var recordId = PlaceUtils.parseURI(record.uri),
                  template = jQuery(
                    '<tr data-uri="' + recordId.uri + '">' +
                      '<td class="record-id">' +
                        '<span class="shortcode"></span>' +
                        '<span class="id"></span>' +
                      '</td>' +
                      '<td class="place-details">' +
                        '<h3>' + record.title + '</h3>' +
                        '<p class="description"></p>' +
                        '<p class="date"></p>' +
                      '</td>' +
                    '</tr>');

              if (recordId.shortcode) {
                template.find('.shortcode').html(recordId.shortcode);
                template.find('.id').html(recordId.id);
                template.find('.record-id').css('background-color', recordId.color);

                if (previousShortcode === recordId.shortcode)
                  template.find('.record-id').css('border-top', '1px solid rgba(0, 0, 0, 0.05)');
              }

              if (record.descriptions && record.descriptions.length > 0)
                template.find('.description').html(record.descriptions[0].description);
              else
                template.find('.description').hide();

              if (record.temporal_bounds)
                template.find('.date').html(
                  Formatting.yyyyMMddToYear(record.temporal_bounds.from) + ' - ' +
                  Formatting.yyyyMMddToYear(record.temporal_bounds.to));
              else
                template.find('.date').hide();

              popup.find('.popup-choices table').append(template);

              if (recordId.shortcode) return recordId.shortcode;
            }, false);

            popup.on('click', 'tr', function(e) {
              var tr = jQuery(e.target).closest('tr');
              self.fireEvent('change', placeBody, {
                uri: tr.data('uri'),
                status: { value: 'VERIFIED' }
              });
              close();
            });

            marker.bindPopup(popup[0]);
            marker.getPopup().on('close', function() { marker.unbindPopup(); });
            marker.openPopup();
          },

          onFlag = function() {
            self.fireEvent('change', placeBody, {
              uri: false,
              status: { value: 'NOT_IDENTIFIABLE' }
            });
            close();
          },

          onNextPage = function(response) {
            var moreAvailable =
              response.total > currentSearchResults.length + response.items.length;

            // Switch wait icon on/off
            if (moreAvailable)
              waitForNext.show();
            else
              waitForNext.hide();

            currentSearchResults = currentSearchResults.concat(response.items);
            currentSearchResultsTotal = response.total;

            resultHeader.html("Total: " + response.total + ", took " + response.took);

            jQuery.each(response.items, function(idx, place) {
              var coord = (place.representative_point) ?
                    [ place.representative_point[1], place.representative_point[0] ] : false,

                  result = new ResultCard(resultList, place),
                  marker = (coord) ? map.addMarker(coord) : false;

              if (marker) {
                result.on('click', function() { openPopup(marker, place); });
                marker.on('click', function(e) { openPopup(marker, place); });
              }
            });
          },

          /** If scrolled to bottom, we load the next result page if needed **/
          onScroll = function() {
            var scrollPos = resultContainer.scrollTop() + resultContainer.innerHeight(),
                scrollBottom = resultContainer[0].scrollHeight;

            if (scrollPos >= scrollBottom)
              if (currentSearchResultsTotal > currentSearchResults.length)
                search(currentSearchResults.length);
          },

          search = function(opt_offset) {
            var offset = (opt_offset) ? opt_offset : 0,
                query = searchInput.val().trim();

            if (query.length > 0)
              API.searchPlaces(query, offset).done(onNextPage);
          },

          clear = function() {
            map.clear();
            resultList.empty();
            currentSearchResults = [];
            currentSearchResultsTotal = 0;
          },

          open = function(quote, body) {
            placeBody = body;

            searchInput.val(quote);
            element.show();
            map.refresh();

            clear();

            search();
          },

          close = function() {
            placeBody = false;
            waitForNext.hide();
            element.hide();
          };

    resultContainer.scroll(onScroll);

    btnFlag.click(onFlag);
    btnCancel.click(close);
    searchInput.keyup(function(e) { if (e.which === 13) { clear(); search(); } });

    this.open = open;
    HasEvents.apply(this);
  };
  GeoresolutionPanel.prototype = Object.create(HasEvents.prototype);

  return GeoresolutionPanel;

});
