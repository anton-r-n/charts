(function(w) {
  var $ = w.$ = w.$ || {};
  var MIN_WIDTH = 250;

  $.Group = function(model) {
    model = $.obj(model);
    var height = Math.max(+(model.height || model._height) | 0, 24);
    var width = Math.min(w.App._width, +model._width | 0 || w.App._width);
    var style = 'width:' + width + 'px';
    var nodes = $.arr(model.nodes);
    var cls = 'Group' + (model.cls ? ' ' + model.cls : '');
    if (model._lastInRow) {
      cls += ' last';
    }
    var type = model.type === 'col' ? 'col' : 'row';
    var minWidth = +model.minWidth | 0 || MIN_WIDTH;

    if (type === 'row') {
      propagateHeight(height, nodes);
      distributeWidth(width, nodes, minWidth);
    } else {
      propagateWidth(width, nodes, minWidth);
    }

    return {
      name: 'div',
      attrs: {'class': cls, 'style': style},
      nodes: [
        model.title ? header(model.title/* model.menu */) : '',
        $.n('div', {'class': 'body'}, model.nodes),
      ],
    };
  };

  function header(title/* menu */) {
    return $.n('div', {'class': 'header withMenu'}, [
      $.n('span', {'class': 'title'}, title),
      $.n('div', {'class': 'menu'}, $.n('b', {'class': 'icon'})),
    ]);
  }

  function propagateHeight(height, nodes) {
    for (var i = 0; i < nodes.length; i++) if (typeof nodes[i] === 'object') {
      nodes[i]._height = height;
    }
  }

  function propagateWidth(width, nodes, minWidth) {
    for (var i = 0, node; node = nodes[i], i < nodes.length; i++) {
      if (typeof node === 'object') {
        node.minWidth = Math.min(node.minWidth, minWidth) || minWidth;
        node._width = width;
      }
    }
  }

  function distributeWidth(totalWidth, nodes, minWidth) {
    var len = nodes.length;
    if (totalWidth >= minWidth && len > 0) {
      if (minWidth * len > totalWidth) {
        breakRows(totalWidth, nodes, minWidth);
      } else {
        splitCells(totalWidth, nodes, minWidth);
      }
    }
    if (len > 0) nodes[len - 1]._lastInRow = true;
  }

  function breakRows(totalWidth, nodes, minWidth) {
    var len = nodes.length;
    var cells = Math.floor(totalWidth / minWidth);
    var rows = Math.ceil(len / cells);
    var maxCells = Math.floor(len / rows);
    var tail = Math.min(maxCells, Math.ceil(len / 2));
    distributeWidth(totalWidth, nodes.slice(len - tail, len), minWidth);
    distributeWidth(totalWidth, nodes.slice(0, len - tail), minWidth);
  }

  function splitCells(totalWidth, nodes, minWidth) {
    var i, node, filled = 0;
    var len = nodes.length;
    var width = totalWidth / len;
    for (i = 0; node = nodes[i], i < len; i++) if (typeof node === 'object') {
      node.minWidth = Math.min(node.minWidth, minWidth) || minWidth;
      node._width = Math.round((i + 1) * width) - filled;
      node._lastInRow = false;
      filled += node._width;
    }
  }
})(this);
