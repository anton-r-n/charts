(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  $.ChartTooltip = function(any) {
    var model = $.obj(any);
    var nodes = [header(model), body(model)];
    return $.n('div', {'class': 'ChartTooltip'}, nodes);
  };

  function header(model) {
    var text = 'header' in model ? '' + model.header : 'Tooltip';
    return $.n('div', {'class': 'header'}, text);
  }

  function body(model) {
    var nodes = $.arr(model.data).map(row);
    return $.n('div', {'class': 'body'}, nodes);
  }

  function row(data) {
    data = $.obj(data);
    var nodes = [
      $.n('span', {'class': data.mark}),
      $.n('span', {'class': 'descr'}, '' + data.descr),
      $.n('span', {'class': 'value'}, '' + data.value),
    ];
    var cls = 'row' + ' color_' + data.color;
    if (data.selected) cls += ' selected';
    return $.n('div', {'class': cls}, nodes);
  }
})(this);
