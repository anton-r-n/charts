(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  $.GeoMap_Tiles = function(model) {
    model = $.obj(model);
    var cls = 'GeoMap_Tiles size' + model.ts;
    return $.n('div', {'class': cls}, tiles(model));
  };

  /* Generate tiles from center tile and ranges */
  function tiles(m) {
    var rx = Math.ceil(m.w / 2 / m.ts);
    var ry = Math.ceil(m.h / 2 / m.ts);
    var x, y, idx, src, nodes = [];
    for (x = -rx; x <= rx; x++) {
      for (y = -ry; y <= ry; y++) {
        idx = path(m.t0.x + x, m.t0.y + y, m.zoom, m.scale);
        src = m.url.prefix + idx + m.url.suffix;
        nodes.push(tile(x * m.ts, y * m.ts, src));
      }
    }
    return {name: 'div', attrs: {'class': 'tiles'}, nodes: nodes};
  }

  /* Generate a tile position and background source */
  function tile(x, y, src) {
    var bg = 'background-image:url("' + src + '")';
    var style = 'top:' + y + 'px;left:' + x + 'px;' + bg;
    return {name: 'u', attrs: {'class': 'tile', 'style': style}};
  }

  /* Path from x, y, zoom, and scale */
  function path(x, y, z, s) {
    return [z, rem(x, s), rem(y, s)].join('/');
  }

  /* Reminder without sign */
  function rem(a, b) { return a < 0 ? a % b + b : a % b; }
})(this);
