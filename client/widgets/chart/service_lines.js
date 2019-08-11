(function(w) {
  var $ = w.$ = w.$ || {};
  $.charts = $.charts || {};

  $.charts.bars = bars;
  $.charts.lines = lines;

  var _emptyArray = [];

  /* Rows to bars */
  function bars(rows, conf) { return rows.map(row, conf).map(bar, conf) }

  /* Process all values in a row */
  function row(r) { return r.map(val, this) }

  /* Map values to pixels */
  function val(v, i) { return [this.sX(i), this.sY(v)] }

  /* Add Y-value of previous data point */
  function setY1(v, i) { v.y1 = (this[i] || _emptyArray)[1]; return v }

  /* Get Y-value of previous data point */
  function getY1(s) { return [s[0], typeof s.y1 === 'number' ? s.y1 : this] }

  /* Close line path */
  function area(s) { return [s, s.concat(s.map(getY1, this).reverse())] }

  /* Transform to SVG path data */
  function path(acc, v) {
    if ('lines' in acc) acc.lines += 'M ' + v[0].join(' ');
    if ('areas' in acc) acc.areas += 'M ' + v[1].join(' ') + ' z';
    return acc;
  }

  function barArea(v) { return 'M ' + v[1].join(' ') + ' z' }

  /* Process one metrics */
  function drawBar(s) {
    var shift = this.stacked ? 0 : (this.width + this.space) * this.idx;
    var p1 = [round(s[0] + this.bucketGap + shift), s[1]];
    var p2 = [round(s[0] + shift + this.width), s[1]];
    p2.y1 = p1.y1 = s.y1;
    return [p1, p2];
  }

  function round(x) { return Math.round(x * 10) / 10 }

  /* Process one metrics */
  function bar(row, i, arr) {
    var prev = this.stacked && i > 0 ? arr[i - 1] : _emptyArray;
    var conf = {
      stacked: this.stacked,
      width: this.tickWidth,
      bucketGap: this.bucketGap,
      space: 0,
      idx: i,
    };
    var data = row
      .map(setY1, prev)
      .map(drawBar, conf)
      .map(area, this.y0)
      .map(barArea);
    return {areas: data};
  }

  /* Rows to lines */
  function lines(rows, conf) { return rows.map(row, conf).map(line, conf) }

  /* Process one metrics */
  function line(row, i, arr) {
    return row
      .map(setY1, arr[i - 1] || _emptyArray)
      .reduce(segment, [])
      .map(stretch).map(area, this.y0)
      .reduce(path, group(this, i));
  }

  /* Configure model for SVG group */
  function group(conf, idx) {
    var g = {lines: ''};
    if (conf.stacked || conf.filled.indexOf(idx) > -1) g.areas = '';
    return g;
  }

  /* Accumulate not-nulls series into segment */
  function segment(a, v) {
    typeof v[1] === 'number' ?
      a.last ? a.last.push(v) : a.push(a.last = [v]) : a.last = null;
    return a;
  }

  /* Replace single point with short dash */
  function stretch(s) {
    if (s.length === 1) {
      var x = s[0][0], y = s[0][1], y1 = s[0].y1, d = 1.5;
      s = [[x - d, y], [x + d, y]];
      s[0].y1 = s[1].y1 = y1;
    }
    return s;
  }
})(this);
