(function(w) {
  /* Namespace */
  var Utils = w.Utils = w.Utils || {};

  Utils.categories = function(title) {
    return {
      'label': title || 'Categories',
      'position': 'bottom',
      'column': 0,
      'tickFormat': '%s',
      'type': 'categories'
    };
  };
})(this);

