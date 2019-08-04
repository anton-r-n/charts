(function(w) {
  /* Namespace */
  var Utils = w.Utils = w.Utils || {};

  Utils.axisX = function(title, start, step, end) {
    return {
      'label': title || 'Date',
      'position': 'bottom',
      'start': start,
      'end': end,
      'step': step,
      'tickFormat': '%Y-%m-%d',
      'dataFormat': 'sec',
      'tzoffset': 0,
      'type': 'datetime',
    };
  };
})(this);
