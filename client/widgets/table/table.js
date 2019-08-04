(function(w) {
  var $ = w.$ = w.$ || {};

  $.Table = function(model) {
    model = $.obj(model);
    var meta = $.obj(model.meta);
    var cols = $.arr(meta.cols);
    var nodes = table(model.data, meta, cols);
    if (nodes.length === 0) {
      nodes = $.n('tr', {}, $.n('td', {}, 'Empty table'));
    }
    return $.n('table', {'class': 'Table columns' + cols.length}, nodes);
  };

  function table(data, meta, cols) {
    var key,
        link,
        nodes = [],
        table = $.tableSplit(meta, data);

    for (key in table) {
      link = key === 'tbody' ? meta.link : null;
      if (table[key].length > 0) {
        nodes.push({name: key, nodes: rows(table[key], cols, link)});
      }
    }
    return nodes;
  }

  function rows(data, cols, link) {
    var i, j, tr, href, rows = [];
    for (i = 0; i < data.length; i++) {
      tr = {name: 'tr', nodes: []};
      rows.push(tr);
      for (j = 0; j < data[i].length; j++) {
        href = link ? (link.base || '') + data[i][link.key] : null;
        tr.nodes.push({name: 'td', nodes: cell(data[i][j], cols[j], href)});
      }
    }
    return rows;
  }

  function cell(val, col, href) {
    var t = $.obj(col).type;
    var cls = 'cell type_' + t;
    val = val === null ? '∅' : val;
    if (t === 'number') {
      val = $.humanize(val);
    }
    else if (t === 'date') {
      if (typeof val === 'number') {
        val = $.format(val, 'datetime', '%Y-%m-%d');
      }
    }
    return href ?
        {name: 'a', attrs: {'class': cls, 'href': href}, nodes: val} :
        {name: 'div', attrs: {'class': cls}, nodes: val};
  }
})(this);
