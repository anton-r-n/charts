(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /**
   * Creates array of ordered numbers from interval of [start, end)
   * `end` is not included, default `step` is 1.
   *
   * Use:
   *   $.range(start, end)
   *   $.range(start, end, step)
   *
   * Example:
   *   $.range(0, 3) // [0, 1, 2]
   *   $.range(2, 10, 3) // [2, 5, 8]
   *   $.range(10, 2, -3) // [10, 7, 4]
   *   $.range(1.5, 3, 0.5) // [1.5, 2, 2.5]
   *
   * @return {Array}
   */
  $.range = function(start, end, step) {
    var i; step = +step || 1;
    var len = Math.ceil((end - start) / step);
    var arr = Array(len);

    for (i = 0; i < len; i++) {
      arr[i] = i * step + start;
    }

    return arr;
  };
})(this);
