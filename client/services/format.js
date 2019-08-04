(function(w) {
  var $ = w.$ = w.$ || {},
      prefix = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  /**
   * The function returns a String containing the value represented in decimal
   * fixed-point notation with maximum two digits after the decimal point with
   * optional multiplicative prefix.
   * Example:
   * 1 1
   * 10 10
   * 100 100
   * 1000 1 k
   * 10000 10 k
   * 100000 100 k
   * 1000000 1 M
   * 10000000 10 M
   * 100000000 100 M
   * @param {Number} value Original value.
   * @return {String} humanized representation.
   */
  $.humanize = function(value) {
    if (typeof value !== 'number') return value;
    var num = value.toExponential(3).split('e'),
        mant = Math.round((+num[0]) * 100),
        exp = +num[1],
        res = (mant * Math.pow(10, exp % 3)) / 100;
    if (exp >= -3 && exp < 0) {
      res = '' + Math.round(value * 1000) / 1000;
    } else if (exp >= 0 && exp < 3) {
      res += '';
    } else if (exp > 0 && exp < 24) {
      res += ' ' + prefix[Math.floor(exp / 3)];
    } else {
      res = value.toExponential(3);
    }
    return res;
  };

  $.percent = function(value) {
    if (typeof value !== 'number') return value;
    return value.toFixed(1) + '%';
  };

  $.format = function(value, type, format, units) {
    units = units ? ' ' + units : '';
    if (typeof value !== 'undefined' && value !== null) {
      switch (type) {
        case 'datetime':
          value = $.tzformat(value, format); break;
        case 'number':
          value = $.humanize(value) + units; break;
        case 'percent':
          value = $.percent(value); break;
        default:
          value = '' + value + units;
      }
    }
    else {
      value = '—';
    }
    return value;
  };
})(this);
