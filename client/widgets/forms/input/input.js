(function(w) {
  var $ = w.$ = w.$ || {};

  $.FormInput = function(model) {
    model = $.obj(model);
    var meta = $.obj(model.meta);
    var cls = 'text';
    var attrs = {
      'id': meta._id || '',
      'name': meta.name || '',
      'placeholder': meta.placeholder || '',
      'tabindex': 1,
      'type': meta.type || 'text',
      'value': meta.value || '',
    };

    attrs['class'] = attrs.type === 'submit' ?
        'submit button mainTarget' : 'text';

    return $.n('input', attrs);
  };
})(this);
