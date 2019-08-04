(function(w) {
  var Data = w.Data = w.Data || {};

  var defaults = [
    'Football',
    'Comedy',
    'Action & Adventure',
    'Talk Shows',
    'News Program',
    'Drama',
  ];

  Data.bar = function(model) {
    model = Object(model);
    var metrics = model.metrics || 5;
    var categories = model.categories || defaults;
    var title = model.title || Utils.randName();
    var nodes = chart(title, metrics, categories, model);
    var height = model.height || Utils.defaultHeight;
    return Utils.widget(nodes, title, height);
  };

  function chart(title, metrics, categories, model) {
    var range = $.range(0, metrics);
    var meta = {
      name: title,
      cols: columns(metrics).slice(1),
      axes: {
        x: Utils.categories(),
        y: Utils.axisY('Viewers', range),
      },
      bucketGap: .4,
      bucketGapMin: .4,
      bucketGapMax: .4,
    };
    meta.axes.x.cols = categories;
    meta.tiny = model.tiny;
    var len = categories.length;
    return {
      widget: 'ChartBars',
      meta: meta,
      data: range.map(series, len),
    };
  }

  function series() {
    var len = this;
    return Utils.series(len);
  }

  function columns(len) {
    var i, arr = [{name: 'Name', type: 'string'}];
    for (i = 0; i < len; i++) {
      arr.push({name: 'Metrics ' + i, type: 'number'});
    }
    return arr;
  }
})(this);
