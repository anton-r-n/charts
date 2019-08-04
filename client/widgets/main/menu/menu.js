(function(w) {
  var $ = w.$ = w.$ || {};

  $.MainMenu = function(model) {
    model = $.obj(model);
    var data = $.obj(model.data);
    var items = $.arr(data.items);
    var icon = model._open ? 'arrowLeft' : 'menu';
    var nodes = [];

    function mousedown(e) {
      if ($.filterEvent(e)) {
        model._open || $.syncEvent('evtEscape');
        toggle();
      }
    }

    function toggle() {
      model._open = !model._open;
      $.update(model, model.__ref);
    }

    function close(e) {
      if (!e || $.filterEvent(e)) {
        model._open && toggle();
      }
    }

    if (items.length > 0) {
      nodes.push({
        name: 'span',
        attrs: {'class': 'MainBtn evtEscape ' + icon},
        props: {'evtEscape': close},
        events: {'mousedown': mousedown},
      });

      if (model._open) {
        nodes.push(
            $.n('div', {'class': 'shadow'}, '', '', {mousedown: close}),
            $.n('div', {'class': 'drawer'}, [header(), content(items)])
        );
      }
    }
    return $.n('div', {'class': 'MainMenu'}, nodes, {}, {'mousedown': prevent});
  };

  function prevent(e) {
    e.preventDefault();
  }

  function content(items) {
    return $.n('ul', {'class': 'content'}, items.map(option));
  }

  function header() {
    return $.n('div', {'class': 'header'},
        [$.n('div', {'class': 'title'}, 'Menu')]);
  }

  function option(item) {
    return $.n('li', {}, $.n('a', {'href': item.link}, item.title));
  }
})(this);
