(function(w) {
  var Mock = w.Mock = w.Mock || {};
  var Pages = w.Pages = w.Pages || {};

  function dashboard(title, idx, nodes) {
    return {
      widget: 'Dashboard',
      menu: {idx: idx, title: title},
      prefix: '/api/dashboard/',
      title: name || '',
      nodes: nodes || '',
    };
  }

  Pages.experience = dashboard('Experience', 0, {
    widget: 'Group',
    type: 'col',
    nodes: [
      {metrics: 1, data: 'line', title: 'Attempts', height: 100},
      {
        widget: 'Group',
        title: 'Two line charts in a row',
        nodes: [
          {metrics: 1, data: 'line', height: 180},
          {metrics: 2, data: 'line', height: 180},
        ],
      },
      {
        widget: 'Group',
        title: 'Three area charts in a row',
        nodes: [
          {metrics: 3, data: 'area'},
          {metrics: 4, data: 'area'},
          {metrics: 5, data: 'area'},
        ],
      },
    ],
  });

  Pages.performance = {
    menu: {idx: 0, title: 'Performance'},
    minWidth: 150,
    widget: 'Group',
    nodes: $.range(0, 70).map(function(_, i) {
      return i % 5 ? {
        data: 'stack',
        height: 80,
        metrics: 2 + (i % 5),
        tiny: true,
      } : {metrics: 1, len: 2 + ((i / 5) % 5), data: 'pie', height: 100};
    }),
  };

  Pages.audience = dashboard('Audience', 0, {
    widget: 'Group',
    type: 'col',
    nodes: [
      {metrics: 1, data: 'line', title: 'Attempts', height: 100},
      {
        widget: 'Group',
        title: 'Two bar charts in a row',
        nodes: [
          {metrics: 3, data: 'bar', height: 180},
          {metrics: 5, data: 'bar', height: 180},
        ],
      },
      {
        widget: 'Group',
        title: 'Three stack charts in a row',
        nodes: [
          {metrics: 3, data: 'stack', title: 'Exits by Asset'},
          {metrics: 4, data: 'stack', title: 'VSF by Asset'},
          {metrics: 5, data: 'stack', title: 'EBVS by Asset'},
        ],
      },
    ],
  });

  Pages.overview = dashboard('Overview', 0, {
    widget: 'Group',
    type: 'col',
    nodes: [
      {metrics: 1, data: 'line', title: 'Attempts'},
      {metrics: 1, data: 'geo'},
      {
        widget: 'Group',
        nodes: [
          {metrics: 1, data: 'area'},
          {metrics: 2, data: 'area'},
          {metrics: 3, data: 'area'},
          {metrics: 4, data: 'area'},
          {metrics: 5, data: 'area'},
        ],
      },
      {
        widget: 'Group',
        nodes: [
          {metrics: 1, data: 'pie', len: 2},
          {metrics: 2, data: 'pie', len: 3},
          {metrics: 3, data: 'pie', len: 4},
          {metrics: 4, data: 'pie', len: 5},
          {metrics: 6, data: 'pie', len: 7},
          {metrics: 7, data: 'pie', len: 8},
        ],
      },
      {
        widget: 'Group',
        nodes: [
          {metrics: 1, data: 'stack'},
          {metrics: 2, data: 'stack'},
          {metrics: 3, data: 'stack'},
          {metrics: 4, data: 'stack'},
          {metrics: 5, data: 'stack'},
        ],
      },
      {metrics: 1, data: 'sankey', cols: 7, rows: 15, height: 160},
      {
        widget: 'Group',
        nodes: [
          {metrics: 1, data: 'line'},
          {metrics: 2, data: 'line'},
          {metrics: 3, data: 'line'},
        ],
      },
      {
        widget: 'Group',
        nodes: [
          {metrics: 1, data: 'bar'},
          {metrics: 2, data: 'bar'},
          {metrics: 3, data: 'bar'},
          {metrics: 4, data: 'bar'},
          {metrics: 5, data: 'bar'},
        ],
      },
    ],
  });

  Pages.geo = dashboard('Geo', 0, {
    widget: 'Group',
    type: 'col',
    nodes: [
      {metrics: 1, data: 'geo', title: 'Attempts'},
      {
        widget: 'Group',
        nodes: [
          {metrics: 1, data: 'geo'},
          {metrics: 2, data: 'geo'},
          {metrics: 3, data: 'geo'},
        ],
      },
    ],
  });

  Pages.pie = dashboard('Pie Charts', 0, {
    widget: 'Group',
    minWidth: 120,
    nodes: $.range(0, 50).map(function(_, i) {
      return {metrics: 1, len: 2 + (i % 7), data: 'pie', height: 100};
    }),
  });

  Pages.tables = dashboard('Tables', 0, {
    widget: 'Group',
    nodes: [
      {metrics: 1, data: 'table0', title: 'Attempts'},
      {metrics: 1, data: 'table1', title: 'Exits by Asset'},
    ],
  });

  Pages.sankey = dashboard('Sankey', 0, {
    widget: 'Group',
    type: 'col',
    nodes: [
      {metrics: 1, data: 'sankey', cols: 6, rows: 20, height: 160, squash: 2},
      {
        widget: 'Group',
        title: 'Two sankey charts in a row',
        nodes: [
          {metrics: 1, data: 'sankey', cols: 5, rows: 15, squash: 0},
          {metrics: 1, data: 'sankey', cols: 5, rows: 15, squash: 4},
        ],
      },
      {
        widget: 'Group',
        title: 'Three sankey charts in a row',
        nodes: [
          {metrics: 1, data: 'sankey', cols: 3, rows: 15, squash: 0},
          {metrics: 1, data: 'sankey', cols: 3, rows: 15, squash: 1},
          {metrics: 1, data: 'sankey', cols: 3, rows: 15, squash: 2},
        ],
      },
      {
        widget: 'Group',
        title: 'Four sankey charts in a row',
        nodes: [
          {metrics: 1, data: 'sankey', cols: 7, rows: 25, squash: 0},
          {metrics: 1, data: 'sankey', cols: 7, rows: 25, squash: 1},
          {metrics: 1, data: 'sankey', cols: 7, rows: 25, squash: 3},
          {metrics: 1, data: 'sankey', cols: 7, rows: 25, squash: 5},
        ],
      },
    ],
  });

  Pages.layout = {
    menu: {idx: 1, title: 'Layout'},
    metrics: 1,
    data: 'layout',
  };

  Pages.form = {
    menu: {idx: 1, title: 'Form'},
    metrics: 1,
    data: 'form',
  };

  Pages.text = {
    menu: {idx: 1, title: 'Text'},
    metrics: 1,
    data: 'text',
  };

  Pages.filters = {
    menu: {idx: 1, title: 'Filters'},
    metrics: 1,
    data: 'filters',
  };

  Pages[''] = Pages.overview;
})(this);
