(function(w) {
  var Data = w.Data = w.Data || {};

  var defaults = [
    'Football',
    'News Program',
    'Comedy',
    'Adventure',
    'Crime',
    'Drama',
    'Action',
    'Fantasy',
    'Ice Hockey',
    'Talk Shows',
    'Historical',
  ];

  Data.pie = function(model) {
    model = model || {};
    var metrics = 1;
    var categories = model.categories || defaults.slice(0, model.len || 3);
    var title = model.title || Utils.randName();
    var color = categories.length > 6 ? model.color : false;
    var nodes = chart(metrics, categories, color, title);
    var height = model.height || Utils.defaultHeight;
    return Utils.widget(nodes, title, height);
  };

  function chart(metrics, categories, color, title) {
    var range = $.range(0, metrics);
    var len = categories.length;
    var data = range.map(series, len);
    var total = data[0].reduce(function(a, v) {return a + v}, 0);
    var meta = {
      cols: columns(metrics),
      axes: {
        x: Utils.categories(),
        y: Utils.axisY('Viewers', range),
      },
      name: title,
      bucketGap: 0.05,
      bucketGapMin: 1,
      color: color,
      total: total,
    };
    meta.axes.x.cols = categories;
    return {
      widget: 'PieChart',
      meta: meta,
      data: data,
    };
  }

  function number(a, b) { return a < b ? 1 : -1 };

  function series() {
    var i, data = [];
    for (i = 0; i < this; i++) {
      data.push(Math.round(Math.random() * 19) * 5 + 5);
    }
    return data.sort(number);
  }

  function columns(len) {
    var i, arr = [];
    for (i = 0; i < len; i++) {
      arr.push({name: 'Metrics ' + i, type: 'number'});
    }
    return arr;
  }
})(this);
