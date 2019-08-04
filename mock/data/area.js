(function(w) {
  var Data = w.Data = w.Data || {};

  var defaults = [
    'Football',
    'Comedy',
    'Action & Adventure',
    'Talk Shows',
    'News Program',
    'Other',
  ];

  Data.area = function(model) {
    model = model || {};
    var metrics = model.metrics || 3;
    var categories = (model.categories || defaults).slice(0, metrics);
    var end = model.end || 1506816000;
    var len = model.len || 24 * 30;
    var step = model.step || 3600;
    var title = model.title || Utils.randName();
    var nodes = chart(name, metrics, categories, end, step, len);
    var height = model.height || Utils.defaultHeight;
    return Utils.widget(nodes, title, height);
  };

  function chart(title, metrics, categories, end, step, len) {
    var start = end - (len - 1) * step;
    var meta = {
      name: title,
      axes: {
        x: Utils.axisX('', start, step, end),
        y: Utils.axisY('', $.range(0, metrics)),
      },
      cols: columns(categories),
      stacked: true,
    };
    return {
      widget: 'ChartLines',
      meta: meta,
      data: meta.cols.map(function() { return Utils.series(len) }),
    };
  }

  function columns(categories) {
    var i, arr = [];
    for (i = 0; i < categories.length; i++) {
      arr.push({name: categories[i], type: 'number'});
    }
    return arr;
  }
})(this);
