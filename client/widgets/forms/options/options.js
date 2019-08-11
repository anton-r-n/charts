(function(w) {
  var $ = w.$ = w.$ || {};

  $.FormOptions = function(model) {
    model = $.obj(model);
    var meta = $.obj(model.meta);
    var data = $.arr(model.data);
    var value = $.arr(meta.value);
    var name = meta.name;
    var cls = 'Options' + (meta.cls ? ' ' + meta.cls : '');
    var type = meta.multiple ? 'checkbox' : 'radio';

    var nodes = data.map(function(item) {
      var checked = value.indexOf(item.value) > -1;
      return option(item, type, name, checked);
    });

    function change() {
      meta.value = $.formData(model.__ref)[name];
    }

    if (meta.render === 'inline') {cls += ' inline'}
    return $.n('div', {'class': cls}, nodes, {}, {'change': change});
  };

  function option(item, type, name, checked) {
    var input = {
      name: 'input',
      attrs: {'type': type, 'name': name, 'value': item.value},
      props: {'checked': checked},
    };
    return {
      name: 'label',
      attrs: {'class': 'inlineLabel', 'tabindex': 1},
      nodes: [input, $.n('i'), item.label],
    };
  }
})(this);
