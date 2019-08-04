(function(w) {
  var $ = w.$ = w.$ || {};

  $.Text = function(model) {
    model = $.obj(model);
    return $.n('div', {'class': 'Text'}, model.data);
  };
})(this);
