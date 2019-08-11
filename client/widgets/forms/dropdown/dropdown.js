(function(w) {
  var $ = w.$ = w.$ || {};

  $.FormDropdown = function(model) {
    model = $.obj(model);
    var meta = $.obj(model.meta);
    var data = $.arr(model.data);
    var value = $.arr(meta.value);
    var nodes = options(data, value, meta.name);
    var cls = 'FormDropdown' + (meta.cls ? ' ' + meta.cls : '');

    function change(e) {
      if ($.filterEvent(e)) {
        $.update(model, model.__ref);
      }
    }

    function toggle(e) {
      if (!e || $.filterEvent(e)) {
        e && e.preventDefault();
        meta._open = meta._open ? 0 : ($.syncEvent('evtEscape'), 1);
        $.update(model, model.__ref);
      }
    }

    function mousedown(e) {
      if ($.filterEvent(e)) {
        var label, idx;
        label = $.closest(model.__ref, e.target, 'label');
        if (label) {
          if (meta.multiple) {
            (idx = value.indexOf(label.value)) > -1 ?
              value.splice(idx, 1) : value.push(label.value);
          } else {
            value[0] = label.value;
          }
        }
      }
    }

    if (meta._open) {
      nodes.push({
        name: 'div',
        attrs: {'class': 'options evtEscape'},
        props: {'evtEscape': toggle},
        nodes: options(data, value, meta.name, 1),
        events: {'mousedown': mousedown},
      });
    }

    return {
      name: 'div',
      nodes: nodes,
      attrs: {'class': cls},
      events: {'change': change, 'mousedown': toggle},
    };
  };

  function options(data, selected, name, all) {
    var nodes = [], include, item, i;

    if (data.length) {
      for (i = 0; i < data.length; i++) {
        item = $.obj(data[i]);
        include = selected.indexOf(item.value) > -1;
        if (all || include) {
          nodes.push(
            option(data[i], include),
            all ? $.n('input', {
              name: name,
              type: 'hidden',
              value: item.value,
            }) : ''
          );
        }
      }
    }
    return nodes;
  }

  function option(item, selected) {
    item = $.obj(item);
    var cls = 'inlineLabel' + (selected ? ' selected' : '');
    return $.n('label', {'class': cls}, item.label, {'value': item.value});
  }
})(this);
