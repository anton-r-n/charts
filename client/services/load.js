(function(w) {
  var $ = w.$ = w.$ || {},
      d = w.document;

  $.loadScript = function(src, fn) {
    var script = d.createElement('script');

    function onload() {
      d.head.removeChild(script);
      if (typeof fn === 'function') fn();
    }

    script.onload = onload;
    script.onerror = onload;
    script.src = '/static/1/' + src;

    d.head.appendChild(script);
  };
})(this);
