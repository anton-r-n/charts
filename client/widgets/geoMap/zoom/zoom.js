(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  var buttons = (function() {
    var plus = $.n('div', {'class': 'plus'});
    var minus = $.n('div', {'class': 'minus'});
    return $.n('div', {'class': 'GeoMap_Zoom'}, [plus, minus]);
  })();

  /* Static component for buttons + - */
  $.GeoMap_Zoom = function() {
    return buttons;
  };
})(this);
