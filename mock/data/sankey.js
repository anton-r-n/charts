(function(w) {
  var Data = w.Data = w.Data || {};

  var defaultHeight = 120;

  Data.sankey = function(model) {
    model = model || {};
    var columns = $.minMax(model.cols, 2, 8);
    var rows = $.minMax(model.rows, 2, 100);
    var title = model.name || model.title || Utils.randName();
    var nodes = chart(title, columns, rows);
    var height = model.height || defaultHeight;
    var squash = +model.squash;

    if (squash >= 0 && squash < columns) {
      squash = 2 * squash;
      nodes.data.forEach(function(row) {
        row[squash] = nodes.data[0][squash];
      });
    }

    return Utils.widget(nodes, title, height);
  };

  function randStr() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  function chart(title, columns, rows) {
    var cols = 2 * columns - 1;
    var names = $.range(0, Math.max(2, rows / 5)).map(randStr);
    var meta = {name: title, cols: $.range(0, cols).map(column)};
    var data = $.range(0, rows).map(row, {cols: cols, names, names});
    return {
      widget: 'Sankey',
      meta: meta,
      data: data,
    };
  }

  function column(v, i) {
    return i % 2 ?
        {name: 'Values' + i, type: 'number'} :
        {name: 'Names' + i, type: 'string'};
  }

  function row(v, i) {
    var i, res = Array(this.cols);
    for (i = 0; i < res.length; i++) {
      res[i] = i % 2 ?
          10 + 5 * ((Math.random() * 10) | 0) :
          this.names[(Math.random() * this.names.length) | 0];
    }
    return res;
  }
})(this);
