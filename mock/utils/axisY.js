(function(w) {
  /* Namespace */
  var Utils = w.Utils = w.Utils || {};

  Utils.axisY = function(title, cols) {
    return {
      'label': title || 'Values',
      'position': 'left',
      'columns': cols || [],
      'tickFormat': '',
      'type': 'linear',
    };
  };
})(this);

