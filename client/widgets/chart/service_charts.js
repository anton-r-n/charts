(function(w) {
  var $ = w.$ = w.$ || {};
  $.charts = $.charts || {};

  $.charts.config = config;
  $.charts.container = container;
  $.charts.linear = linear;
  $.charts.maxLength = maxLength;
  $.charts.rect = rect;
  $.charts.scale = scale;
  $.charts.span = span;
  $.charts.stack = stack;
  $.charts.cls = cls;
  $.charts.index = index;

  var isArray = Array.isArray;

  function maxLength(arr) { return Math.max.apply(null, arr.map(len)) }

  function len(arr) { return arr.length || 0 }

  function isNumber(v) { return typeof v === 'number' && v === v }

  /* Define chart's rectangle */
  function rect(model, meta) {
    return {
      w: Math.max(+model._width || 0, 10),
      h: Math.max(+model.height || model._height, 10),
    };
  }

  /* Rendering options */
  function config(meta, rect, len, cls) {
    var tiny = meta.tiny || rect.w < 100 || rect.h < 80;
    if (!meta.wide) { rect.w -= 32 }
    if (!tiny) { rect.h -= 40 }
    return {
      filled: [0],
      name: meta.name,
      stacked: !!meta.stacked,
      zero: meta.zero !== false,
      tiny: tiny,
      bucketGap: +meta.bucketGap || (!!meta.stacked ? 0.2 : 0.05),
      bucketGapMin: +meta.bucketGapMin || 1,
      bucketGapMax: +meta.bucketGapMin || 1,
      cols: columns(meta.cols, len),
      cls: cls,
      w: rect.w,
      h: rect.h,
    };
  }

  function columns(metaCols, len) {
    var i, c, cols = [];
    if (isArray(metaCols)) {
      for (i = 0; i < len; i++) {
        c = metaCols[i];
        if (c) {
          cols[i] = {
            name: c.name,
          };
        }
        else {
          cols[i] = {
            name: 'Metrics ' + i,
          };
        }
      }
    }
    return cols;
  }

  /* Model for SVG widget */
  function container(rect, metrics) {
    return {
      widget: 'ChartSVG',
      width: rect.w,
      height: rect.h,
      data: metrics,
    };
  }

  function span(arr) {
    var i, v, min = 1 / 0, max = -1 / 0;
    for (i = 0; i < arr.length; i++) {
      v = arr[i];
      /* exclude missing data like nulls */
      if (isNumber(v)) {
        if (v < min) min = v;
        if (v > max) max = v;
      }
      /* handle multi-dimension arrays */
      else if (isArray(v)) {
        v = span(v);
        if (v.min < min) min = v.min;
        if (v.max > max) max = v.max;
      }
    }
    return {min: simplify(min), max: simplify(max)};
  }

  /* Round up numbers */
  function simplify(x) {
    if (typeof x !== 'number') return x;
    var sign = x < 0 ? -1 : 1;
    var d0 = Math.abs(x).toExponential(5).split('e');
    var d1 = Math.ceil(+d0[0] * 10);
    var d2 = Math.ceil(d1 / 10) * 10;
    var res = d2 - d1 > d1 * .1 ? Math.ceil(d1 / 2) * 2 : d2;
    return sign * res * Math.pow(10, d0[1] - 1);
  }

  function round(x) { return Math.round(x * 10) / 10 }

  function index(r, d, bars) {
    var max = bars ? d - 1 : d;
    return function(x) { return Math.min((x / r * d) << 0, max) };
  }

  function linear(x0, x1, v0, v1) {
    return function(v) {
      return isNumber(v) ? round((v - v0) / (v1 - v0) * (x1 - x0)) : v;
    }
  }

  var Types = {
    'linear': linear,
  };

  function scale(type, r, d) {
    return Types[type](r.min, r.max, d.min, d.max);

  }

  function stack(rows) {
    return rows.reduce(stackRow, []);
  }

  function stackRow(acc, v, i) {
    acc[i] = v.map(stackVal, acc[i - 1] || []);
    return acc;
  }

  function stackVal(v, i) {
    v = isNumber(v) ? v : null;
    return isNumber(this[i]) ? v + this[i] : v;
  }

  /* Return value of class attribute */
  function cls(conf) {
    var stacked = conf.stacked ? ' stacked' : '';
    var tiny = conf.tiny ? ' tiny' : '';
    var confCls = conf.cls ? ' ' + conf.cls : '';
    return 'Chart' + stacked + tiny + confCls;
  }
})(this);
