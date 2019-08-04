(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Widget */
  $.ChartAxis = function(any) {
    /* Get basic attributes */
    var model = $.obj(any);
    var meta = $.obj(model.meta);
    var ticks = $.arr(model.ticks);

    /* Dimensions */
    var w = Math.max(+model._w || 10, 10);
    var h = Math.max(+model._h || 10, 10);

    /* Nodes */
    var locate = meta.position === 'bottom' ? 'bottom' : 'left';
    var config = {locate: locate, fmt: format(meta)};
    if (meta.type === 'categories') {
      config.width = Math.round(1e4 / ticks.length) / 100;
    }

    var nodes = ticks.map(tick, config);
    var attrs = {
      'class': cls(locate, meta, model.categories),
      'style': style(locate, w, h),
    };
    return $.n('div', attrs, nodes);
  };

  /* Generate model for AxisTick widget */
  function tick(t) {
    return {
      widget: 'ChartAxisTick',
      value: this.fmt(t[1]),
      display: this.locate,
      width: this.width,
      offset: t[0],
      cls: t[0] === 0 ? 'first' : t[0] === 100 ? 'last' : '',
    };
  }

  /* Return self */
  function self(v) { return v }

  /* Build formatting function */
  function format(meta) {
    switch (meta.type) {
      case 'datetime':
        var fmt = meta.tickFormat || '';
        return fmt ? function(v) { return $.tzformat(v, fmt, 0) } : self;
      case 'linear':
        return $.humanize;
      default:
        return self;
    }
  }

  /* Build class attribute from axis location and meta attributes */
  function cls(locate, meta, categories) {
    var type = meta.type ? ' ' + meta.type : '';
    var cls = meta.cls ? ' ' + meta.cls : '';
    if (categories) { cls += ' categories' }
    return 'ChartAxis ' + locate + type + cls;
  }

  /* Axis positioned absolutely related to container of the chart widget. */
  function style(locate, w, h) {
    var prop = locate === 'bottom' ? 'top:' : 'height:';
    return 'width:' + w + 'px;' + prop + h + 'px;';
  }
})(this);
