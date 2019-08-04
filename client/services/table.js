(function(w) {
  var $ = w.$ = w.$ || {};

  $.tableSplit = function(meta, inputData) {
    var table = {thead: [], tbody: [], tfoot: []},
        head = $.num_(meta.head),
        foot = $.num_(meta.foot),
        total = $.num_(meta.total),
        cols = $.arr(meta.cols),
        data = $.arr(inputData),
        length = data.length;

    if (length > head + total + foot) {
      if (head === 0) {
        /* Make table head from column names */
        table.thead = [cols.map(function(c) {return c.name})];
      } else {
        /* Make table head from first n rows */
        table.thead = data.slice(0, head);
      }
      if (total > 0) {
        /* Add total values to table head */
        table.thead = table.thead.concat(data.slice(head, head + total));
      }
      table.tfoot = data.slice(length - foot);
      table.tbody = data.slice(head + total, length - foot);
    }
    return table;
  };

  $.tableSort = function(t, col) {
    col = +col || 0;
    t.sort(function(a, b) {return a[col] - b[col]});
    return t;
  };
})(this);
