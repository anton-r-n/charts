(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  var copyright = (function() {
    var url = 'https://www.openstreetmap.org/copyright';
    var text = 'OpenStreetMap contributors';
    var attrs = {'class': 'external', 'target': '_blank', 'href': url};
    var copy = String.fromCharCode(169, 32);
    var link = $.n('a', attrs, text);
    return $.n('div', {'class': 'GeoMapCopyright'}, [copy, link]);
  })();

  /* Static component for copyright */
  $.GeoMapCopyright = function() {
    return copyright;
  };
})(this);
