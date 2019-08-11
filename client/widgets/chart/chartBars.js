(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Widget */
  $.ChartBars = function(any) {
    /* Validate input structure */
    var model = $.obj(any);
    var data = $.arr(model.data);
    var meta = $.obj(model.meta);

    /* Data and canvas */
    var rect = $.charts.rect(model, meta);
    var conf = $.charts.config(meta, rect, data.length, 'bars');
    var rows = conf.stacked ? $.charts.stack(data) : data;

    /* Nodes */
    var nodes = [$.charts.container(rect, metrics(rect, rows, axes, conf))];
    var axes = $.charts.axes($.obj(meta.axes), conf, 'categories');
    var overlay = $.n('div');
    conf.categories = axes.x.meta.cols;
    conf.bars = true;

    function mousemove(e) {
      var selected = $.charts.tooltip(e, data, rows, conf);
      highlight(selected, overlay.__ref, rows, conf);
    }

    function mouseout(e) {
      if (!model.__ref.contains(e.relatedTarget)) {
        highlight({}, overlay.__ref, rows, conf);
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
    conf.dX = {min: 0, max: $.charts.maxLength(rows)};
    conf.dY = $.charts.span(conf.zero ? [0, rows] : rows);

    /* pixel ranges */
    conf.rX = {min: 0, max: rect.w};
    conf.rY = {min: 0, max: rect.h};

    /* axis scales */
    conf.sX = $.charts.scale('linear', conf.rX, conf.dX);
    conf.sY = $.charts.scale('linear', conf.rY, conf.dY);

    conf.bucketGap = Math.min(conf.bucketGapMax, Math.max(
      conf.rX.max / conf.dX.max * conf.bucketGap, conf.bucketGapMin));

    /* zero Y to calculate fill area */
    conf.y0 = conf.sY(conf.zero ? 0 : conf.dY.min);
    conf.index = $.charts.index(conf.rX.max, conf.dX.max, 1);
    conf.tickWidth = conf.rX.max / conf.dX.max - conf.bucketGap;
    if (!conf.stacked) { conf.tickWidth /= rows.length }

    /* mapping data */
    return $.charts.bars(rows, conf);
  }

  function highlight(selected, ref, rows, conf) {
    if (selected.col !== conf._col || selected.metrics !== conf._metrics) {
      conf._col = selected.col;
      conf._metrics = selected.metrics;
      $.syncEvent('evtHighlight', selected);
    }
  }
})(this);
