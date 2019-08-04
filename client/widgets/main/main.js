(function(w) {
  var $ = w.$ = w.$ || {};

  var modal = {widget: 'MainModal', nodes: []};
  var tooltip = {widget: 'MainTooltip'};

  $.Main = function(any) {
    var model = Object(any);
    var data = Object(model.data);
    var menu = {widget: 'MainMenu', data: model.menu};
    var content = {
      widget: 'MainContent',
      title: model.title,
      data: model.data,
      _aside: model._aside,
    };

    model._cls = 'Main evtToggleAside evtUpdateMain evtHighlight';

    return {
      name: 'div',
      attrs: {'class': model._cls},
      nodes: [content, menu, modal, tooltip],
      props: {
        'evtHighlight': highlight.bind(model),
        'evtToggleAside': toggleAside.bind(model),
        'evtUpdateMain': update.bind(model),
      },
      events: {'click': click.bind(model)},
    };
  };

  function toggleAside() {
    var model = this;
    model._aside = !model._aside;
    $.update(model, model.__ref);
  }

  function update() {
    updateMain(this, location);
  }

  function click(e) {
    var model = this;
    if (e && $.filterEvent(e) && !e.preventClick) {
      var link = $.closest(e.currentTarget, e.target, 'a[href]');
      if (link && !$.external(link)) {
        e.preventDefault();
        $.syncEvent('evtEscape');
        updateMain(model, link);
      }
    }
  }

  function updateMain(model, link) {
    function update(data) {
      model.data = data || model.data;
      $.update(model, model.__ref);
    }

    var prefix = model.prefix || '';
    var req = (prefix + link.pathname).replace(/\/+/g, '/');
    $.requestJSON('GET', req + link.search, update).send();
    $.setLocation(link.pathname + link.search);
  }

  function highlight(data) {
    var model = this;
    var cls = model._cls;
    var opacity = '';
    data = Object(data);
    if (data.col !== model._col || data.metrics != model._metrics) {
      model._col = data.col;
      model._metrics = data.metrics;
      if (data.col >= 0) {
        cls += ' col' + (data.col + 1);
        opacity += ' opacity_col';
      }
      if (data.metrics >= 0) {
        cls += ' metrics' + data.metrics;
        opacity += ' opacity_metrics';
      }
      model.__ref.className = cls + opacity;
    }
  }
})(this);
