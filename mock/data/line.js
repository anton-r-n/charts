(function(w) {
  var Data = w.Data = w.Data || {};

  Data.line = function(model) {
    model = model || {};
    var metrics = model.metrics || 3;
    var end = model.end || 1506816000;
    var len = model.len || 24 * 30;
    var step = model.step || 3600;
    var title = model.title || Utils.randName();
    var nodes = chart(title, metrics, end, step, len);
    var height = model.height || Utils.defaultHeight;
    return Utils.widget(nodes, title, height);
  };

  function chart(title, metrics, end, step, len) {
    var start = end - (len - 1) * step;
    var meta = {
      name: title,
      cols: $.range(0, metrics).map(column),
      axes: {
        x: Utils.axisX('', start, step, end),
        y: Utils.axisY('', $.range(0, metrics)),
      },
    };
    return {
      widget: 'ChartLines',
      meta: meta,
      data: meta.cols.map(function() { return Utils.series(len) }),
    };
  }

  function column(_, i) {
    return {name: 'Metrics ' + i, type: 'number'};
  }
})(this);
