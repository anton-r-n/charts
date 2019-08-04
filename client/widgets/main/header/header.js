(function(w) {
  var $ = w.$ = w.$ || {};

  $.MainHeader = function(any) {
    var model = $.obj(any);
    var text = model.title || 'App Header';
    return $.n('div', {'class': 'MainHeader'}, [title(text), buttons()]);
  };

  function title(text) {
    return $.n('div', {'class': 'title'}, '' + text);
  }

  function buttons() {
    return $.n('div', {'class': 'buttons'}, [
      button('refresh', 'evtUpdateMain'),
      button('settings', 'evtToggleAside'),
      button('settings', 'evtModal'),
    ]);
  }

  function button(cls, evt) {
    function mousedown(e) {
      if ($.filterEvent(e)) {
        e.preventDefault();
        $.syncEvent('evtEscape');
        $.syncEvent(evt);
      }
    }
    return {
      name: 'span',
      attrs: {'class': 'MainBtn ' + cls},
      events: {'mousedown': mousedown},
    };
  }
})(this);
