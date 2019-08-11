(function(w) {
  var $ = w.$ = w.$ || {};

  var _;

  /**
   * Any to array.
   *
   * @param {any} a Any value.
   * @return {Array}
   */
  $.arr = function(a) { return Array.isArray(a) ? a : a == _ ? [] : [a] };


  /**
   * Any to object.
   *
   * @param {any} a Any value.
   * @return {object} object which supports dot notaion to access a property.
   */
  $.obj = function(o) { return o instanceof Object ? o : Object(o) };


  $.int = function(v) { return +v | 0 };


  $.minMax = function(v, min, max) {
    v = +v | 0;
    return v > min ? v < max ? v : max : min;
  };


  $.arrMin = function(arr) {
    return Math.min.apply(null, arr);
  };


  $.arrMax = function(arr) {
    return Math.max.apply(null, arr);
  };


  $.arrSum = function(arr) {
    var i, s;
    for (i = 0; i < arr.length; s += +arr[i++] || 0);
    return s;
  };


  $.round = function(n, d) {
    return +(+n).toFixed(d);
  };


  $.randomId = function() {
    return Math.random().toString(36).substr(2, 11);
  };
})(this);
