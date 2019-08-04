(function(w) {
  var $ = w.$ = w.$ || {},
      d = w.document;

  $.svgNs = 'http://www.w3.org/2000/svg';

  $.n = function(a, b, c, d, e) {
    return {
      name: a,
      attrs: b,
      nodes: c,
      props: d,
      events: e,
    };
  };

  $.svg = function(a, b, c, d, e) {
    return {
      name: a,
      attrs: b,
      nodes: c,
      props: d,
      events: e,
      xmlns: $.svgNs,
    };
  };

  $.num_ = function(n) {
    n = +n;
    return isNaN(n) || !isFinite(n) ? 0 : n;
  };

  /** Polyfill for Element.matches() method. */
  (function() {
    var _proto = w.Element.prototype;
    if (!_proto.matches) {
      _proto.matches = _proto.matchesSelector ||
          _proto.mozMatchesSelector || _proto.msMatchesSelector ||
          _proto.oMatchesSelector || _proto.webkitMatchesSelector;
    }
  })();


  $.closest = function(base, target, selector) {
    if (base.contains(target)) {
      while (target !== base) {
        if (target.matches(selector)) {
          return target;
        }
        target = target.parentNode;
      }
    }
  };


  $.trigger = function(node, name, details) {
    var e = node.ownerDocument.createEvent('CustomEvent');
    e.initCustomEvent(name, true, true, details);
    node.dispatchEvent(e);
  };


  $.rem = parseInt(w.getComputedStyle(d.documentElement)['font-size']);


  $.contentWidth = function() {
    return Math.min(w.innerWidth, d.body.clientWidth);
  };


  $.filterEvent = function(e) {
    return !(e.defaultPrevented || e.button > 0 ||
        e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);
  };

  $.external = function(link) {
    return /external/.test(link.className);
  };


  $.processEvent = function(f) {
    return function(e) {
      $.filterEvent(e) && f.call(this, e);
    };
  };


  /* History API support */
  $.setLocation = function(url) {
    history.pushState({}, '', url);
  };


  $.selector = function(s) {
    return String(s)
        .replace(/\s/mg, ' ')
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');
  };
})(this);
