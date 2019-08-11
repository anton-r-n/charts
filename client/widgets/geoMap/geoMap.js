(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Defaults */
  var tileSize = 256;
  var defaultZoom = 3;
  var minZoom = 2;
  var maxZoom = 10;
  var PI = Math.PI;
  var lastWheel = 0;
  var wheelTimeout = 200;
  var dragTimeout = 0;

  /* Widget */
  $.GeoMap = function(model) {
    model = $.obj(model);
    var meta = $.obj(model.meta);

    var width = (model._width || 300) - 2;
    var height = Math.max(+(meta.height || model._height), 24);
    var cls = 'GeoMap ' + (meta.cls || '') + (meta._drag ? ' move' : '');

    config(meta, width, height);
    var data = $.tableSplit(meta, model.data);
    var nodes = chart(meta, data.tbody);

    nodes.events = {'mousedown': dragstart.bind(model)};
    if (meta._drag) {
      meta._drag.x1 = $.mouse.x;
      meta._drag.y1 = $.mouse.y;
      nodes.props = nodes.props || {};
      nodes.props['evtMouseup'] = dragstop.bind(model);
      nodes.attrs['class'] += ' evtMouseup';
      w.setTimeout(debounceDrag.bind(model), 0);
    }
    var style = 'width:' + width + 'px;height:' + height + 'px';
    var attrs = {
      'class': cls,
      'style': style,
    };
    var events = {
      'mousedown': mousedown.bind(model),
      'wheel': debounceWheel.bind(model),
    };
    var zoom = {widget: 'GeoMapZoom'};
    var copyright = {widget: 'GeoMapCopyright'};
    var msg = model._wheelMsg = {widget: 'GeoMapWheelMsg'};
    return $.n('div', attrs, [nodes, zoom, copyright, msg], {}, events);
  };

  function debounceDrag() {
    var model = this;
    var meta = $.obj(model.meta);
    var drag = $.obj(meta._drag);
    if (drag.x1 !== $.mouse.x || drag.y1 !== $.mouse.y) {
      $.update(model, model.__ref);
    }
    if (meta._drag) {
      dragTimeout && w.clearTimeout(dragTimeout);
      dragTimeout = w.setTimeout(debounceDrag.bind(model), 0);
    }
  }

  /* Save mouse initial coordinates */
  function dragstart(e) {
    var model = this;
    var meta = $.obj(model.meta);
    if ($.filterEvent(e)) {
      e.preventDefault();
      meta._drag = {x0: $.mouse.x, y0: $.mouse.y};
      $.update(model, model.__ref);
    }
  }

  /* Update map center and redraw */
  function dragstop() {
    var model = this;
    var meta = $.obj(model.meta);
    var c = meta._center;
    meta.lat = y2lat(c.y / meta._size);
    meta.lon = x2lon(c.x / meta._size);
    meta._drag = null;
    dragTimeout && w.clearTimeout(dragTimeout);
    $.update(model, model.__ref);
  }

  /* Debounce wheel event */
  function debounceWheel(e) {
    var time = new Date;
    if (anyMetaKey(e)) {
      e.preventDefault();
    }
    if (time - lastWheel > wheelTimeout) {
      lastWheel = time;
      wheel(this, e);
    }
  }

  /* Handle mouse wheel event */
  function wheel(model, e) {
    var meta = $.obj(model.meta);
    var msg = model._wheelMsg;
    if (anyMetaKey(e)) {
      scrollZoom(model, meta, e);
    } else if (!msg.state) {
      msg.state = 1;
      $.update(msg, msg.__ref);
    }
  }

  /* Event has any meta key */
  function anyMetaKey(e) {
    return e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
  }

  /* Change zoon on mouse wheel event */
  function scrollZoom(model, meta, e) {
    var zoom = e.deltaY < 0 ? meta._zoom + 1 : meta._zoom - 1;
    zoomUpdate(zoom, model, meta);
  }

  /* Update zoon if necessary */
  function zoomUpdate(zoom, model, meta) {
    zoom = validateZoom(zoom);
    if (zoom !== meta._zoom) {
      meta._zoom = zoom;
      $.update(model, model.__ref);
    }
  }

  /* Handle zoom plus/minus buttons */
  function mousedown(e) {
    var model = this;
    var meta = $.obj(model.meta);
    var z = meta._zoom;
    if ($.filterEvent(e)) {
      switch (e.target.className) {
      case 'plus':
        e.preventDefault();
        zoomUpdate(z + 1, model, meta);
        break;
      case 'minus':
        e.preventDefault();
        zoomUpdate(z - 1, model, meta);
        break;
      }
    }
  }

  /* Validate meta and update computed properties */
  function config(m, w, h) {
    m._w = w;
    m._h = h;
    m._ts = tileSize;
    m._url = m.tilesUrl;
    m._lon = m.lon % 180 || 0;
    m._lat = m.lat % 90 || 0;
    m._zoom = validateZoom(m._zoom || m.zoom);
    m._scale = Math.pow(2, m._zoom);
    m._size = m._scale * m._ts;
    m._center = center(m);

    var ts = m._ts;
    var c = m._center;
    m._t0 = {x: Math.floor(c.x / ts), y: Math.floor(c.y / ts)};
    m._shift = {x: -Math.round(c.x % ts), y: -Math.round(c.y % ts)};
  }

  /* Validate zoom */
  function validateZoom(z) {
    return Math.min(Math.max(z || defaultZoom, minZoom), maxZoom);
  }

  /* Screen coordinates of center of the map */
  function center(m) {
    var c = projection(m._lon, m._lat, m._size);
    var d = m._drag;
    if (d) {
      c.x = rem(c.x + (d.x0 - d.x1 || 0), m._size);
      c.y = rem(c.y + (d.y0 - d.y1 || 0), m._size);
    }
    return c;
  }

  /* Container with tiles and marks */
  function chart(m, d) {
    var style = 'left:' + m._shift.x + 'px;top:' + m._shift.y + 'px';
    var attrs = {'class': 'c1', 'style': style};
    var tiles = {
      widget: 'GeoMapTiles',
      w: m._w,
      h: m._h,
      c: m._center,
      t0: m._t0,
      ts: m._ts,
      url: m._url,
      scale: m._scale,
      zoom: m._zoom,
    };
    var marks = {
      widget: 'GeoMapMarks',
      center: m._center,
      shift: m._shift,
      width: m._w,
      height: m._h,
      size: m._size,
      data: d,
    };
    var c1 = {name: 'div', attrs: attrs, nodes: [tiles, marks]};
    return {name: 'div', attrs: {'class': 'c0 noselect'}, nodes: c1};
  }

  /* Projection of longitude, latitude to x, y consulting to map size */
  function projection(lon, lat, s) {
    return {x: Math.round(lon2x(lon) * s), y: Math.round(lat2y(lat) * s)};
  }

  $.GeoMap.projection = projection;

  /* Reminder without sign */
  function rem(a, b) { return a < 0 ? a % b + b : a % b }

  /* See: http://wiki.openstreetmap.org/wiki/Mercator */
  function x2lon(x) {
    return x * 360 - 180;
  }

  function y2lat(y) {
    return 360 / PI * (Math.atan(Math.exp((.5 - y) * PI * 2)) - PI / 4);
  }

  function lon2x(lon) {
    return .5 + lon / 360;
  }

  function lat2y(lat) {
    return .5 - Math.log(Math.tan(PI / 4 + lat * PI / 180 / 2)) / PI / 2;
  }
})(this);
