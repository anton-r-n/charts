(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Widget */
  $.ChartLines = function(any) {
    /* Get basic attributes */
    var model = $.obj(any);
    var meta = $.obj(model.meta);
    var data = $.arr(model.data);

    /* Data and canvas */
    var rect = $.charts.rect(model, meta);
    var conf = $.charts.config(meta, rect, data.length, 'lines');
    var rows = conf.stacked ? $.charts.stack(data) : data;

    /* Nodes */
    var nodes = [$.charts.container(rect, metrics(rect, rows, axes, conf))];
    var axes = $.charts.axes($.obj(meta.axes), conf, 'linear');
    var overlay = $.n('div');
    conf.linear = true;

    function mousemove(e) {
      var selected = $.charts.tooltip(e, data, rows, conf);
      highlight(selected, overlay.__ref, rows, conf);
    }

    function mouseout(e) {
      if (!model.__ref.contains(e.relatedTarget)) {
        highlight({}, overlay.__ref);
      }
    }

    if (!conf.tiny) nodes.push(axes.x, axes.y, overlay);
    var cls = $.charts.cls(conf);
    var events = {mousemove: mousemove, mouseout: mouseout};
    var canvas = $.n('div', {'class': 'canvas'}, nodes);
    return $.n('div', {'class': cls}, canvas, null, events);
  };

  /* Data to pixels */
  function metrics(rect, rows, axes, conf) {
    /* data domains */
    conf.dX = {min: 0, max: $.charts.maxLength(rows) - 1};
    conf.dY = $.charts.span(conf.zero ? [0, rows] : rows);

    /* pixel ranges */
    conf.rX = {min: 0, max: rect.w};
    conf.rY = {min: 0, max: rect.h};

    /* axis scales */
    conf.sX = $.charts.scale('linear', conf.rX, conf.dX);
    conf.sY = $.charts.scale('linear', conf.rY, conf.dY);

    /* zero Y to calculate fill area */
    conf.y0 = conf.sY(0);

    conf.index = $.charts.index(conf.rX.max, conf.dX.max);

    /* mapping data */
    return $.charts.lines(rows, conf);
  }

  function dots(rows, idx, scale) {
    var i, y, nodes = [];
    for (i = 0; i < rows.length; i++) {
      y = rows[i][idx];
      if (y !== null) {
        nodes[i] = {
          name: 'span',
          attrs: {
            'class': 'dot color_' + i,
            'style': 'bottom:' + (scale(y) - 3) + 'px',
          }
        };
      }
    }
    return nodes;
  }

  function highlight(selected, ref, rows, conf) {
    var col = 'col' in selected ? selected.col : -1;
    var overlay = {name: 'div'};
    if (col >= 0) {
      overlay.nodes = dots(rows, col, conf.sY);
      overlay.attrs = {
        'class': 'highlight',
        'style': 'left:' + conf.sX(col) + 'px',
      };
    }
    $.update(overlay, ref);
  }
})(this);
