(function(w) {
  var Data = w.Data = w.Data || {};

  Data.table0 = function() {
    var meta = {
      cols: [
        {name: 'Name', type: 'string'},
        {name: 'Plays', type: 'number'},
        {name: 'Minutes', type: 'number'},
        {name: 'Viewers', type: 'number', _min: 10, _max: 30},
        {name: 'Min/Viewer', type: 'number', _min: 10000, _max: 30000},
      ],
      sort: 1,
    };

    return {
      widget: 'Group',
      title: 'Aggregated Categories',
      cls: 'widget',
      nodes: Utils.table(meta, 20, 'Table'),
    };
  };

  Data.table1 = function() {
    var meta = {
      cols: [
        {name: 'Date', type: 'date'},
        {name: 'Plays', type: 'number'},
        {name: 'Minutes', type: 'number'},
        {name: 'Viewers', type: 'number', _min: 10, _max: 30},
        {name: 'Min/Viewer', type: 'number', _min: 10000, _max: 30000},
      ],
      link: {
        base: '/',
        key: 0,
      },
      sort: 0,
    };

    return {
      widget: 'Group',
      title: 'Combined Timeseries',
      cls: 'widget',
      nodes: Utils.table(meta, 20, 'Table'),
    };
  };
})(this);
