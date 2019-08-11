(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Document */
  var d = w.document;

  var handlers = {
    keydown: function(e) {
      !e.defaultPrevented && e.key === 'Escape' ?
        $.syncEvent('evtEscape') : $.syncEvent('evtKeydown', e);
    },

    mousedown: function(e) {
      if ($.filterEvent(e) && !e.escapePrevented) {
        $.syncEvent('evtEscape');
      }
    },

    mousemove: function(e) {
      var mouse = Object($.mouse);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      $.syncEvent('evtMousemove', e);
    },

    mouseout: function(e) {
      if (!e.relatedTarget || e.relatedTarget.nodeName === 'HTML') {
        $.syncEvent('evtMouseout', e);
      }
    },

    mouseup: function(e) { $.syncEvent('evtMouseup', e) },

    resize: function(e) { $.syncEvent('evtResize', e) },

    wheel: function(e) { $.syncEvent('evtWheel', e) },
  };

  $.events = {
    init: function() {
      var key, handler;
      for (key in handlers) {
        handler = handlers[key];
        key !== 'wheel' ?
          w.addEventListener(key, handler) :
          w.addEventListener(key, handler, {passive: true});
      }
    },

    remove: function() {
      for (var key in handlers) {
        w.removeEventListener(key, handlers[key]);
      }
    },
  };

  /* App global mouse position */
  $.mouse = {x: 0, y: 0};

  /**
   * Dispatches synchronous calls
   * A target DOM node should have class evtName
   * and handler function assigned to the node property evtName.
   */
  $.syncEvent = function(name, details) {
    var i, handler, nodes;
    nodes = d.querySelectorAll('.' + name);
    for (i = 0; i < nodes.length; i++) {
      handler = nodes[i][name];
      if (typeof handler === 'function') {
        handler(details);
      }
    }
  };
})(this);
