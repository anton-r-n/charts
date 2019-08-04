(function(w) {
  /* Namespace */
  var Utils = w.Utils = w.Utils || {};

  var max = 100;

  Utils.series = function(len) {
    var i, arr = new Array(len);
    if (len > 0) {
      arr[0] = Math.round(max * Math.random());
      for (i = 1; i < len; i++) arr[i] = relativeValue(arr[i - 1]);
    }
    return arr;
  };

  function relativeValue(prev) {
    var mult = Math.random() > .9 ? 4 : 8;
    var diff = Math.round(max / mult * (Math.random() - .5));
    var next = prev + diff;
    return (next < max && next > 0) ? next : next - 2 * diff;
  }
})(this);
