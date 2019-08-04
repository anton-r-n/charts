(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Widget */
  $.ChartAxisTick = function(model) {
    model = $.obj(model);
    var offset = +model.offset || 0;
    var position = options[model.display] || 'left';

    var style = position + ':' + offset + '%';
    if (model.width) { style += ';width:' + model.width + '%' }
    var value = $.n('span', {'class': 'value'}, '' + model.value);
    var text = $.n('div', {'class': 'text'}, value);
    var attrs = {
      'class': 'tick' + (model.cls ? ' ' + model.cls : ''),
      'style': style,
    };
    return $.n('div', attrs, text);
  };

  var options = {
    'left': 'bottom',
    'right': 'bottom',
    'bottom': 'left',
  };
})(this);
