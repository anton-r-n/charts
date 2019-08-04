(function(w) {
  var Data = w.Data = w.Data || {};

  Data.layout = function() {
    return {
      widget: 'Group',
      type: 'col',
      cls: 'demoLayout',
      nodes: [2, 3, 4, 5, 6, 13].map(widgets).concat(columns()),
    };
  };

  function widgets(n, type) {
    var i, nodes = [];
    for (i = 0; i < n; i++) {
      nodes.push({'widget': 'Group', 'cls': 'widget'});
    }
    return {
      widget: 'Group',
      type: type || 'row',
      title: n + ' widgets',
      nodes: nodes,
    };
  }

  function columns() {
    return {
      widget: 'Group',
      type: 'row',
      title: '3 columns',
      nodes: [
        widgets(3, 'col'),
        widgets(4, 'col'),
        widgets(5, 'col'),
      ],
    };
  }
})(this);
