(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Widget */
  $.ChartSVG = function(model) {
    model = $.obj(model);
    var data = $.arr(model.data);
    var width = +model.width || 0;
    var height = +model.height || 0;
    var cls = 'ChartSVG' + (model.cls ? ' ' + model.cls : '');
    var attrs = {'class': cls, 'width': width, 'height': height};
    var nodes = [
      $.svg('g', {'class': 'area'}, data.map(area)),
      $.svg('g', {'class': 'line'}, data.map(line)),
    ];
    return $.svg('svg', attrs, transform(nodes, height));
  };

  function area(d, i) {
    return $.svg('g', {'class': 'area' + i}, $.arr(d.areas).map(path));
  }

  function path(v) { return $.svg('path', {'d': v}) }

  function line(d, i) {
    return d.lines ? $.svg('path', {'class': 'line' + i, 'd': d.lines}) : '';
  }

  function transform(nodes, h) {
    var attrs = {'transform': 'translate(0,' + h + ') scale(1,-1)'};
    return $.svg('g', attrs, nodes);
  }
})(this);
