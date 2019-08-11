(function(w) {
  var $ = w.$ = w.$ || {};

  /* `FormField` selects type of field and adds wrapper. */
  $.FormField = function(model) {
    model = $.obj(model);
    var meta = $.obj(model.meta);
    meta._id = meta._id || $.randomId();

    return $.n('div', {'class': cls(meta)}, [
      label(meta),
      $.n('div', {'class': 'field'}, input(model, meta)),
    ]);
  };

  function cls(meta) {
    var cls = 'row';
    if (meta.cls) {cls += ' ' + meta.cls}
    if (meta.type === 'submit') {cls += ' submit'}
    return cls;
  }

  function label(meta) {
    return 'label' in meta ? $.n('div', {'class': 'label'},
      $.n('label', {'for': meta._id}, meta.label)) : '';
  }

  function input(model, meta) {
    if (meta.type === 'options') {
      return {widget: 'FormOptions', data: model.data, meta: meta};
    }
    if (meta.type === 'dropdown') {
      return {widget: 'FormDropdown', data: model.data, meta: meta};
    }
    return {widget: 'FormInput', data: model.data, meta: meta};
  }
})(this);
