(function(w) {
  var $ = w.$ = w.$ || {};

  var days = 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
      abbrs = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
      months = ('January February March April May June July August September ' +
          'October November December').split(' ');

  var predefined = {
    'ISO': '%Y-%m-%dT%H:%M:%S%z',
    'US': '%m/%d/%Y %H:%M',
    'D': '%m/%d/%Y',
    'X': '%h %m %s',
    'DT': '%Y-%m-%d-%H-%M',
  };

  /**
   * Format UTC date with time zone offset
   * @param {Object} date Date or timestamp in ms.
   * @param {String} format Date format, default ISO.
   * @param {Number} tz Time zone fixed offset in minutes.
   * @return {String} formatted date.
   */
  $.tzformat = function(date, format, tz) {
    date = cleanDate(date);
    format = cleanFormat(format);
    tz = cleanTimezone(tz, date);

    if (tz !== 0) date = new Date(date - tz * 6e4);

    return format.replace(/%(\w)/g, function(_, $1) {
      switch ($1) {
        case 'B': return months[date.getUTCMonth()];
        case 'H': return pad(date.getUTCHours());
        case 'M': return pad(date.getUTCMinutes());
        case 'S': return pad(date.getUTCSeconds());
        case 'Y': return date.getUTCFullYear();
        case 'a': return days[date.getUTCDay()];
        case 'b': return abbrs[date.getUTCMonth()];
        case 'd': return pad(date.getUTCDate());
        case 'm': return pad(date.getUTCMonth() + 1);
        case 'y': return date.getUTCFullYear() % 100;
        case 'z': return replaceTimezone(tz);
        default: return '';
      }
    });
  };

  function cleanDate(obj) {
    return obj instanceof Date ? obj :
        obj && obj.date instanceof Date ? obj.date : new Date();
  }

  function cleanFormat(format) {
    format = typeof format === 'string' ? format : predefined['ISO'];
    return predefined[format] || format;
  }

  function cleanTimezone(tz, date) {
    return typeof tz === 'number' ? tz : date.getTimezoneOffset();
  }

  function replaceTimezone(tz) {
    if (tz === 0) return 'Z';
    return [
      (tz > 0 ? '+' : '-'),
      pad(Math.abs(Math.round(tz / 60))),
      ':',
      pad(Math.abs(Math.round(tz % 60))),
    ].join('');
  }

  function pad(n) { return (n < 10 ? '0' : '') + n }

  $.parseDate = function(dateString) {
    var date, d = dateString.split('-');
    switch (d.length) {
      case 3: date = new Date(d[0], d[1] - 1, d[2]);
      case 5: date = new Date(d[0], d[1] - 1, d[2], d[3], d[4]);
      default: date = new Date(dateString);
    }
    if (isNaN(date.getTime())) {
      date = new Date();
    }
    return date;
  };
})(this);
