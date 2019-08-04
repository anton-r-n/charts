(function(w) {
  var $ = w.$ = w.$ || {};

  $.MainAside = function(any) {
    return {
      name: 'div',
      attrs: {'class': 'MainAside'},
      nodes: [header('About Aside'), body(mock())],
    };
  };

  function header(text) {
    var events = {'mousedown': mousedown};
    var close = $.n('span', {'class': 'MainBtn close'}, '', '', events);
    return $.n('div', {'class': 'header'}, ['' + text, close]);
  }

  function body(data) {
    return $.n('div', {'class': 'body'}, data);
  }

  function mousedown(e) {
    if ($.filterEvent(e)) {
      e.preventDefault();
      $.syncEvent('evtEscape');
      $.syncEvent('evtToggleAside');
    }
  }

  function mock() {
    return $.range(0, 100).map(function() {
      return $.n('p', {'style': 'margin:.5rem 1rem'}, $.randomId());
    });
  }
})(this);
