(function(w) {
  var $ = w.$ = w.$ || {};
  $.charts = $.charts || {};
  $.charts.tooltip = tooltip;

  function tooltip(e, data, rows, conf) {
    var rel = relative(e, conf),
      col = conf.index(rel.x),
      values = data.map(column, col),
      header = buildHeader(col, conf, data),
      closest = conf.bars ?
        conf.stacked ? stackedIdx : closestBar : closestIdx,
      metrics = closest(rows, col, rel, conf);

    if (rows.length <= 1) metrics = -1;

    e.preventTooltip = true;
    $.syncEvent('evtTooltip', content(values, conf, header, metrics, 'dot'));
    return { col: col, metrics: metrics };
  }

  function column(m) { return m.length > this ? m[this] : null }

  function buildHeader(col, conf, data) {
    var header = conf.name ? '' + conf.name : 'Metrics';

    header += ' ' + col;

    if (Array.isArray(conf.categories)) {
      header += ' / ' + conf.categories[col];
    }

    if (conf.stacked) {
      header += ' Total: ' + sum(data, col);
    }

    return header;
  }

  function sum(data, col) {
    var i, v, sum = 0;
    for (i = 0; i < data.length; i++) {
      v = +data[i][col];
      sum += isNaN(v) ? 0 : v;
    }
    return sum;
  }

  function relative(e, conf) {
    var rect = e.currentTarget.getBoundingClientRect();
    var shift = conf.tiny ? 0 : -24;
    return {x: e.clientX - rect.left, y: rect.bottom - e.clientY + shift};
  }

  function content(values, conf, header, metrics, cls) {
    var cols = conf.cols;
    var plate = {
      widget: 'ChartTooltip',
      header: header,
      data: [],
    };
    var i, val;
    for (i = 0; i < values.length; i++) {
      val = values[i];
      val = val === null ? '—' : $.humanize(val);
      plate.data.push({
        mark: cls,
        selected: i === metrics,
        descr: cols[i].name,
        value: val,
        color: i,
      });
    }

    if (conf.stacked) {
      plate.data.reverse();
    }

    return plate;
  }

  function closestBar(rows, col, rel, conf) {
    var maxCol = rows[0].length * rows.length - 1;
    return Math.floor(Math.min(maxCol, rel.x / conf.tickWidth)) % rows.length;
  }

  function stackedIdx(rows, col, rel, conf) {
    var i = 0, y = rel.y, scale = conf.sY;
    while (i < rows.length - 1 && !(scale(rows[i][col]) > y)) i++;
    return i;
  }

  function closestIdx(rows, col, rel, conf) {
    var i, d, min = 1 / 0, metrics = -1, y = rel.y, scale = conf.sY;
    for (i = 0; i < rows.length; i++) {
      d = Math.abs(scale(rows[i][col]) - y);
      if (d < min) {
        metrics = i;
        min = d;
      }
    }
    return metrics;
  }
})(this);
