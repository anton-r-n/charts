(function(w) {
  var $ = w.$ = w.$ || {};

  var ops = {
    'and': 'and',
    'eq': '=',
    'gt': '>',
    'gte': '>=',
    'lt': '<',
    'lte': '<=',
    'or': 'or',
  };

  $.Filter = function(model) {
    model = $.obj(model);

    function toggle(e) {
      var content = model.__ref.querySelector('.content');
      // console.log('--', content.innerText);
      model._focus = e && e.type === 'focus';
      $.update(model, model.__ref);
      if (!model._focus) { content.blur(); }
    }

    var nodes = type($.obj(model.rule));
    var attrs = {'class': 'content', 'tabindex': 100};
    var events = {}, props = {};

    if (model._focus) {
      attrs['class'] += ' plain evtEscape';
      events['blur'] = toggle;
      props['evtEscape'] = toggle;
      props['contenteEditable'] = true;
    } else {
      attrs['class'] += ' highlight';
      events['focus'] = toggle;
    }

    var content = $.n('div', attrs, nodes, props, events);
    return $.n('div', {'class': 'Filter'}, content);
  };

  function str(v) { return '' + v }

  function type(rule) {
    return ['and', 'or'].indexOf(rule.op) > -1 ? union(rule) : plain(rule);
  }

  function op(v) {
    return $.n('span', {'class': 'op ' + v}, ops[v]);
  }

  function parenthesis(term) {
    return Array.prototype.concat(
        $.n('span', {'class': 'paren'}, '('),
        term,
        $.n('span', {'class': 'paren'}, ')')
    );
  }

  function union(rule) {
    var i, nodes = [], rules = $.arr(rule.rules);
    for (i = 0; i < rules.length; i++) {
      if (nodes.length > 0) {
        nodes.push(' ', op(rule.op), ' ');
      }
      nodes.push(type($.obj(rules[i])));
    }
    nodes = nodes.length ? parenthesis(nodes) : nodes;
    return $.n('span', {'class': 'rule'}, nodes);
  }

  function plain(rule) {
    var nodes = [
      $.n('span', {'class': 'field'}, str(rule.field)),
      ' ', op(rule.op), ' ',
      $.n('span', {'class': 'value'}, str(rule.value)),
    ];
    return $.n('span', {'class': 'term'}, nodes);
  }
})(this);
