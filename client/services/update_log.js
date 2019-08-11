(function(w) {
  var $ = w.$ = w.$ || {};

  var render, idx = 0;

  w.setTimeout(function() {
    render = $.update;
    $.update = log;
  }, 0);

  /* Wrap `render` function with callback */
  function log(spec, node, fn) {
    return w.debug ? wrap(spec, node, fn) : render(spec, node, fn);
  }

  function wrap(spec, node, fn) {
    var start = {t0: new Date};
    var res = render(spec, node, time(spec, fn, start));
    start.t1 = new Date;
    return res;
  }

  /* Wrap collback function to log rendeiring time before callback. */
  function time(s, fn, start) {
    if (s && (s.widget === 'MainTooltip' || s.name === 'div')) return;
    return function() {
      var end = new Date;
      var js = start.t1 - start.t0;
      var br = end - start.t1;
      var total = end - start.t0;
      var src = s.widget ? 'Widget: ' + s.widget : 'Node: ' + s.name;
      w.console.log(
        '#%s JS: %s ms; Browser: %s ms; Total %s ms; %s',
        idx++, js, br, total, src);
      if (typeof fn === 'function') fn();
    };
  }
})(this);
