(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  $.PieChart = function(any) {
    /* Validate input structure */
    var model = $.obj(any);
    var meta = $.obj(model.meta);
    var axes = $.obj(meta.axes);
    var data = $.arr(model.data).map(validate);
    var cols = $.arr($.obj(axes.x).cols);

    /* Nodes */
    var conf = config(model, meta);
    var nodes = data.map(donut, conf).map(group, conf);
    var totalValue = data.length > 0 ? data[0].total : null;
    if (totalValue) nodes.push(total(totalValue, conf.size / 2));
    var events = { 'mousemove': function(e) { tooltip(e, data, cols, conf) }};
    return chart(conf, nodes, meta, events);
  };

  /* Spec for chart */
  function chart(conf, nodes, meta, events) {
    var size = conf.size;
    var radius = size / 2;
    var transform = {'transform': 'translate(' + [radius, radius] + ')'};
    var groups = $.svg('g', transform, nodes);
    var dimensions = {'width': size, 'height': size};
    var content = $.svg('svg', dimensions, groups, null, events);
    var container = $.n('div', {'class': 'center'}, content);
    events['mouseout'] = function(e) {
      if (!content.__ref.contains(e.relatedTarget)) {
        $.syncEvent('evtHighlight', {});
      }
    };
    return $.n('div', {'class': cls(conf, meta)}, container);
  }

  function validate(row) {
    row = row.map(positive);
    return {total: row.reduce(sum, 0), values: row};
  }

  function positive(v) { v = +v; return v > 0 ? v : 0 }

  function sum(acc, value) { return acc + value }

  /* Class attribute from meta values */
  function cls(conf, meta) {
    var m1 = meta.cls ? ' ' + meta.cls : '';
    return 'PieChart' + m1;
  }

  /* Spec for `total` value in the center of the pie chart */
  function total(value, r) {
    var attrs = {'class': 'total', 'text-anchor': 'middle', 'dy': $.rem / 2};
    return r < 20 ? '' : $.svg('text', attrs, $.humanize(value));
  }

  /* Config holds validated parameters from model */
  function config(model, meta) {
    var w = $.int(model._width) - 32;
    var h = $.int(model._height) - 20;
    var size = Math.max(Math.min(w, h), 50);
    var radius = size / 2 - 1;
    var defaultBar = (size / 12) | 0;

    return {
      size: size,
      radius: radius,
      name: meta.name || 'Pie Chart',
      bar: $.minMax(meta.bar || defaultBar, 1, radius),
      space: $.minMax(meta.space, 1, 10),
      color: meta.color === false ? false : $.minMax(meta.color, 0, 5),
    };
  }

  /* Data to pixels */
  function donut(row, i) {
    var r2 = this.radius - i * (this.bar + this.space);
    var r1 = r2 - this.bar;
    var current = 0, j, start, end, segments = [];
    if (row.total > 0) {
      for (j = 0; j < row.values.length; j++) {
        start = projection(current / row.total);
        current += row.values[j];
        end = projection(current / row.total);
        segments.push(segment(start, end, r1, r2));
      }
    }
    return segments;
  }

  /* Spec for group of segments */
  function group(segments, i) {
    var cls = 'area area' + (this.color + i);
    return $.svg('g', {'class': cls}, segments.map(path, this));
  }

  /* Spec for each segment */
  function path(d, i) {
    var attrs = {'d': d};
    if (this.color === false) attrs['class'] = 'fill' + i;
    return $.svg('path', attrs);
  }

  function projection(v) { return (v * 2 - .5) * Math.PI }

  function round(x) { return Math.round(x * 10) / 10 }

  /* Coordinates of each segment */
  function segment(start, end, r1, r2) {
    var large = end - start > Math.PI ? 1 : 0,
      innerSweep = start > end ? 1 : 0,
      outerSweep = start > end ? 0 : 1;

    var x1 = round(r1 * Math.cos(start)),
      y1 = round(r1 * Math.sin(start)),
      x2 = round(r2 * Math.cos(start)),
      y2 = round(r2 * Math.sin(start)),
      x3 = round(r2 * Math.cos(end)),
      y3 = round(r2 * Math.sin(end)),
      x4 = round(r1 * Math.cos(end)),
      y4 = round(r1 * Math.sin(end));

    return [
      'M', x1, y1,
      'L', x2, y2,
      'A', r2, r2, 0, large, outerSweep, x3, y3,
      'L', x4, y4,
      'A', r1, r1, 0, large, innerSweep, x1, y1,
      'Z'
    ].join(' ');
  }

  function tooltip(e, data, cols, conf) {
    var plate = {
      widget: 'ChartTooltip',
      header: conf.name,
      data: [],
    };
    var angle = angleFromPosition(e);
    var i, j, selected = {};
    for (i = 0; i < data.length; i++) {
      j = indexFromAngle(data[i], angle);
      if (j >= 0) {
        plate.data.push({
          mark: 'dot',
          descr: cols && cols.length > j ? cols[j] : '',
          value: $.humanize(data[i].values[j]),
          color: conf.color === false ? j : conf.color,
        });
        selected.metrics = j;
      }
    }
    e.preventTooltip = true;
    $.syncEvent('evtTooltip', plate);
    $.syncEvent('evtHighlight', selected);
  }

  function angleFromPosition(e) {
    var rect = e.currentTarget.getBoundingClientRect(),
      x = e.clientX - rect.left - rect.width / 2,
      y = e.clientY - rect.top - rect.height / 2;
    return Math.atan2(-x, y) / (2 * Math.PI) + .5;
  }

  function indexFromAngle(data, angle) {
    var sum = 0;
    var j = 0;
    if (data.total > 0) {
      while (sum / data.total <= angle && j < data.values.length) {
        sum += data.values[j];
        j++;
      }
    }
    return --j;
  }
})(this);
