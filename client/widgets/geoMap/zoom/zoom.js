(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  var buttons = (function() {
    var plus = $.n('div', {'class': 'plus'});
    var minus = $.n('div', {'class': 'minus'});
    return $.n('div', {'class': 'GeoMapZoom'}, [plus, minus]);
  })();

  /* Static component for buttons + - */
  $.GeoMapZoom = function() {
    return buttons;
  };
})(this);
