(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  $.GeoMap_Marks = function(model) {
    var m = $.obj(model);
    var cls = 'GeoMap_Marks' + (m.cls || '');
    var nodes = marks(m.data, m.center, m.shift, m.size, m.width, m.height);
    return $.n('div', {'class': cls}, nodes);
  };

  /* Generate list of marks */
  function marks(data, center, shift, size, width, height) {
    var nodes = [], p0, p1, x0, y0, i, x, h;
    for (i = 0; i < data.length; i++) {
      p0 = data[i];
      p1 = $.GeoMap.projection(p0[2], p0[1], size);
      x0 = p1.x - center.x - shift.x;
      y0 = p1.y - center.y - shift.y;
      h = y0 + shift.y + height / 2;
      if (h > 0 && h < height + 70) {
        for (x = x0 - size; x < width; x += size) {
          if (x >= -width / 2) {
            nodes.push(mark(x, y0, p0[0], p0[3]));
          }
        }
      }
    }
    return $.n('div', {'class': 'marks'}, nodes);
  }

  /* Single mark */
  function mark(x, y, title, value) {
    var label = {name: 'div', attrs: {'class': 'label'}, nodes: [
      {name: 'div', attrs: {'class': 'title'}, nodes: title},
      {name: 'div', attrs: {'class': 'value'}, nodes: $.humanize(value)},
    ]};
    var plate = {name: 'div', attrs: {'class': 'plate'}, nodes: label};
    var attrs = {'class': 'mark', 'style': 'left:' + x + 'px;top:' + y + 'px'};
    return {name: 'div', attrs: attrs, nodes: plate};
  }
})(this);

