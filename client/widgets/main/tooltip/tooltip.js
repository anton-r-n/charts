(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Defaults */
  var space = 20;
  var maxWidth = 250;

  /* Globals */
  var model, _;

  $.MainTooltip = function(m) {
    model = $.obj(m);
    var d = model.data = model.data || _;
    return {
      name: 'div',
      props: {'evtTooltip': update, 'evtMousemove': move},
      events: {'mousemove': prevent},
      attrs: {'class': 'MainTooltip evtMousemove evtTooltip', 'style': style()},
      nodes: d === _ ? '' : container(d),
    };
  };

  function container(data) {
    return {
      name: 'div',
      attrs: {'class': 'container evtMousemove evtMouseout evtWheel evtEscape'},
      nodes: data,
      props: {
        'evtMousemove': move,
        'evtMouseout': move,
        'evtEscape': update,
        'evtWheel': move,
      },
    };
  }

  /* Show or hide tooltip with new content */
  function update(data) {
    if (model.data !== data) {
      model.data = data;
      $.update(model, model.__ref);
    }
  }

  /* Prevent blinking */
  function prevent(e) {
    e.preventTooltip = true;
  }

  /* Tooltip uses global service $.mouse to get pointer coordinates */
  function style() {
    return getX() + 'px;' + getY() + 'px';
  }

  function getX() {
    var x = $.mouse.x;
    var width = w.innerWidth;
    return (width < 600 && x < width / 2) || (x < width - maxWidth - 5) ?
      'left:' + (space + x) : 'right:' + (width + space - x);
  }

  function getY() {
    var y = $.mouse.y;
    var height = w.innerHeight;
    return y > height - 100 ? 'bottom:' + (height - y) : 'top:' + (y - space);
  }

  function move(e) {
    if (e && !e.preventTooltip && model.data) {
      e.preventTooltip = true;
      update(e.target.getAttribute('data-tooltip'));
    }
    if (model.data && model.__ref) model.__ref.setAttribute('style', style());
  }
})(this);
