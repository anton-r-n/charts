(function(w) {
  var $ = w.$ = w.$ || {};

  $.Dashboard = function(any) {
    var model = $.obj(any);
    var nodes = $.arr(model.nodes);
    transmitDimenstions(nodes, model);

    var controls = [
      {
        widget: 'DashboardTiming',
        data: model.timing,
      },
      {
        name: 'span',
        attrs: {'class': 'MainBtn refresh'},
        events: {'mousedown': update.bind(model)},
      },
    ];

    return {
      name: 'div',
      attrs: {'class': 'Dashboard'},
      nodes: [
        $.n('div', {'class': 'controls'}, controls),
        $.n('div', {'class': 'content'}, nodes),
      ],
    };
  };

  function transmitDimenstions(nodes, model) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i]._width = model._width;
      nodes[i]._height = model._height;
    }
  }

  function update() {
    updateDashboard(this, location);
  }

  function updateDashboard(model, link) {
    function update(data) {
      if (data && data.nodes) {
        model.nodes = data.nodes;
        $.update(model, model.__ref);
      }
    }

    var prefix = model.prefix || '';
    var req = (prefix + link.pathname).replace(/\/+/g, '/');
    $.requestJSON('GET', req + link.search, update).send();
    $.setLocation(link.pathname + link.search);
  }
})(this);
