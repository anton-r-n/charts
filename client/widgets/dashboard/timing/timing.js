(function(w) {
  var $ = w.$ = w.$ || {};

  $.DashboardTiming = function(any) {
    var model = $.obj(any);
    var format = model.format || '%m/%d/%Y %H:%M';
    var nodes = [
      dateField(model.start, format, 0),
      ' – ',
      dateField(model.end, format, 0),
      ' ',
      tzField(),
    ];

    return $.n('div', {'class': 'DashboardTiming'}, nodes);
  };

  function dateField(date, format, tz) {
    return $.n('span', {'class': 'field'}, $.tzformat(date, format, tz));
  }

  function tzField() {
    return $.n('span', {'class': 'field'}, 'UTC');
  }
})(this);
