(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  var content = (function() {
    var msg = 'Use meta + scroll to resize the map';
    var text = $.n('div', {'class': 'text'}, msg);
    return $.n('div', {'class': 'msg'}, text);
  })();

  /* Static component for wheel message */
  $.GeoMapWheelMsg = function(model) {
    model = $.obj(model);
    var cls = 'GeoMapWheelMsg';
    var nodes = '';
    function update() {$.update(model, model.__ref)}
    model.to && w.clearTimeout(model.to);
    switch (model.state) {
    case 1:
      nodes = content;
      model.state++;
      model.to = w.setTimeout(update, 0);
      break;
    case 2:
      nodes = content;
      model.state++;
      cls += ' animated';
      model.to = w.setTimeout(update, 1200);
      break;
    case 3:
      nodes = content;
      model.state++;
      model.to = w.setTimeout(update, 200);
      break;
    case 4:
      model.state = 0;
      model.to = w.setTimeout(update, 1000);
    }
    return $.n('div', {'class': cls}, nodes);
  };
})(this);
