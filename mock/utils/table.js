(function(w) {
  /* Namespace */
  var Utils = w.Utils = w.Utils || {};

  var DEFAULT_ROWS = 10;

  Utils.table = function(meta, rows, widget) {
    var data;
    meta = Object(meta);
    meta.cols = meta.cols.map(validColumn);
    data = matrix(meta.cols, +rows || DEFAULT_ROWS);
    if ('sort' in meta) {
      data.sort(function(a, b) { return b[meta.sort] - a[meta.sort] });
    }
    return { widget: widget || 'Group', meta: meta, data: data };
  };

  function validColumn(col, idx) {
    col = Object(col);
    col.name = '' + col.name || 'col' + idx;
    if (col.type === 'number') {
      col._max = Math.max(col._max || 100, col._min || 0);
      col._min = Math.min(col._max || 100, col._min || 0);
    }
    if (col.type === 'date') {
      col._step = +col._step || -86400000;
      col._start = +col._start || floor(new Date().getTime(), col._step);
    }
    return col;
  }

  function matrix(cols, rows) {
    var i, j, col, span, diff, next, data = [];
    for (i = 0; i < rows; i++) {
      data[i] = [];
      for (j = 0; j < cols.length; j++) {
        col = cols[j];
        switch (col.type) {
          case 'number':
            data[i][j] = i === 0 ?
                randomValue(col) :
                randomRelativeValue(col, data[i - 1][j]);
            break;
          case 'date':
            data[i][j] = col._start + i * col._step;
            break;
          default:
            data[i][j] = randomString();
        }
      }
    }
    return data;
  }

  function randomValue(col) {
    return (col._max - col._min) * Math.random() + col._min;
  }

  function randomRelativeValue(col, prev) {
    var mult = Math.random() > .8 ? 3 : 10;
    var diff = (col._max - col._min) / mult * (Math.random() - .5);
    var next = prev + diff;
    return (next < col._max && next > col._min) ? next : next - 2 * diff;
  }

  function randomString() {
    return String.fromCharCode(Math.round(Math.random() * 25) + 65) +
        Math.random().toString(36).substr(2, 11);
  }

  function floor(a, b) {
    b = Math.abs(b);
    return Math.floor(a / b) * b;
  }
})(this);
