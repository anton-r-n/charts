(function(w) {
  var Data = w.Data = w.Data || {};
  var Utils = w.Utils = w.Utils || {};

  var defaultHeight = 350;

  Data.geo = function(model) {
    model = model || {};
    var metrics = model.metrics || 1;
    var cities = model.cities || Utils.cities;
    var title = model.name || model.title || Utils.randName();
    var nodes = chart(metrics, cities);
    var height = model.height || defaultHeight;
    var w = Utils.widget(nodes, title, height);
    w.cls += ' wide';
    return w;
  };

  function chart(metrics, categories) {
    var meta = {
      'lon': 0,
      'lat': 42,
      'tilesUrl': {
        'prefix': 'https://maps.wikimedia.org/osm-intl/',
        'suffix': '@2x.png'
      },
      'cols': columns(metrics),
      'axes': {
        'x': Utils.categories(),
        'y': Utils.axisY('Viewers', cols(metrics)),
      },
    };
    var data = values(metrics, categories);
    return {
      'widget': 'GeoMap',
      'data': data,
      'meta': meta,
    };
  }

  function values(metrics, categories) {
    var arr = [];
    var len = categories.length;
    var config = {cols: [{type: 'number', _min: 10, _max: 1000}]};
    var data = Utils.table(config, len).data;
    for (var i = 0; i < len; i++) {
      arr[i] = categories[i].concat(data[i]);
    }
    return arr;
  }

  function cols(len) {
    var i, arr = [];
    for (i = 0; i < len; arr.push(i + 3), i++);
    return arr;
  }

  function columns(len) {
    var i, arr = [
      {name: 'Name', type: 'string'},
      {name: 'Latitude', type: 'int'},
      {name: 'Longitude', type: 'int'},
    ];
    for (i = 0; i < len; i++) {
      arr.push({name: 'Metrics ' + i, type: 'int'});
    }
    return arr;
  }
})(this);
