(function(w) {
  var $ = w.$ = w.$ || {};
  $.charts = $.charts || {};
  $.charts.axes = axes;

  /* Configure axes */
  function axes(axes, conf, type) {
    var axisXmeta = axes.x || defaultAxis('bottom');
    var axisX = axisWidget(axisXmeta, conf);
    if (type === 'categories') {
      axisX.meta.type = 'categories';
      axisX.maxTicks = conf.dX.max;
    }
    if (axisX.meta.type === 'datetime') {
      axisX.meta.cls = (axisX.meta.cls || '') + ' linear';
    }

    var axisYmeta = axes.y || defaultAxis('left');
    var axisY = axisWidget(axisYmeta, conf);

    axisX.ticks = ticks(axisX, conf.dX);
    axisY.ticks = ticks(axisY, conf.dY);
    return {x: axisX, y: axisY};
  }

  function defaultAxis(position) {
    return {
      position: position,
      type: 'linear',
    };
  }

  function axisWidget(axis, rect) {
    return {
      widget: 'ChartAxis',
      meta: axis,
      _w: rect.w,
      _h: rect.h,
    };
  }

  /* Arrange axis ticks */
  function ticks(axis, data) {
    var locate = axis.meta.position === 'bottom' ? 'bottom' : 'left';
    var scaleFn = $.charts.scale('linear', {min: 0, max: 100}, data);

    var typeFn = types[axis.meta.type] || types['categories'];
    var maxTicks = axis.maxTicks;
    if (!maxTicks && locate === 'bottom') {
      maxTicks = Math.min(axis._w / 100, 12);
    } else {
      maxTicks = axis._h < 100 ? 2 : Math.min(axis._h / 25, 5);
    }
    return typeFn(maxTicks, data, axis.meta, scaleFn);
  }

  var types = {
    'datetime': dateTimeTicks,
    'linear': linearTicks,
    'categories': categoriesTicks,
  };

  function categoriesTicks(_, d, meta, scaleFn) {
    var i, ticks = [];
    var cols = Array.isArray(meta.cols) ? meta.cols : $.range(0, d.max);
    for (i = d.min; i < d.max; i++) {
      ticks.push([scaleFn(i), cols[i]]);
    }
    return ticks;
  }

  function linearTicks(maxTicks, d, _, scaleFn) {
    var step = Math.ceil((d.max - d.min) / maxTicks);
    var min = Math.ceil(d.min / step) * step;
    var max = Math.floor(d.max / step) * step;
    var i, ticks = [];
    for (i = min; i <= max; i += step) {
      ticks.push([scaleFn(i), i]);
    }
    return ticks;
  }

  function dateTimeTicks(maxTicks, d, meta, scaleFn) {
    var r = dateTimeRange(meta);
    var step = roundToPeriod((meta.end - meta.start) / maxTicks);
    var min = Math.ceil(r.min / step) * step;
    var max = Math.floor(r.max / step) * step;
    var i, ticks = [];
    for (i = min; i <= max; i += step) {
      ticks.push([scaleFn((i - r.min) / r.step), i * 1000]);
    }
    return ticks;
  }

  var timePeriods = [
    1, 5, 10, 30, 60, 120, 300, 600, 900, 1200, 1800,
    3600, 7200, 14400, 21600, 28800, 43200, 86400,
    172800, 259200, 432000, 604800, 1209600, 2592000,
    5184000, 7776000, 10368000, 15552000, 31536000,
  ];

  function roundToPeriod(step) {
    for (var i = 0; i < timePeriods.length; i++) {
      if (step <= timePeriods[i]) {
        return timePeriods[i];
      }
    }
    return step;
  }

  function dateTimeRange(x) {
    var range = {
      max: x.end || 0,
      min: x.start || 0,
      step: x.step || 0,
    };
    switch (x.dataFormat) {
      case 'iso':
        range.min = $.parseDate(range.min) / 1000;
        range.max = $.parseDate(range.max) / 1000;
        range.step = 86400;
        break;
      case 'ms':
        range.min /= 1000;
        range.max /= 1000;
        range.step /= 1000;
        break;
    }
    return range;
  };
})(this);
