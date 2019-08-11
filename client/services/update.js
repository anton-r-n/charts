/*
  Update or create DOM tree recursively from a tree of specifications.

  `spec` parameter is explicit description of a DOM node:

  Where `spec` is one of the following:

  1. if `spec` is object with key 'widget' as below:
    {
      widget: 'Func', // widget name
      ...  // other fields are optional and specific for the widget
    }

    Widget name shall begin with capital letter A-Z.
    Function `Func` shall be present in the namespace `$`.
    `Func` recieives `spec` object as argument.
    The result of the call of function will passed as `spec` to the update().

  2. else if `spec` is object and has key `name`
    the spec will interpreted as
    {
      name:   // tag name
      attrs:  // a map of attributes
      props:  // a map of properties
      events: // a map event handlers
      xmlns:  // a namespace for SVG, MATHML, etc.
      nodes:  // list of child nodes
    }
    Other fields will be ignored.

  3. else if `spec` contains neither `name` nor `widget` then `spec` will be
    casted to a string and update() will return a TextNode with the string as
    its value.
*/

(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /* Link to `document` */
  var d = w.document;

  /* Shorthand for `undefined` */
  var _;

  /* Export */
  $.update = update;

  /* Update node recursively according to spec */
  function update(spec, node, fn) {
    if (typeof fn === 'function') w.setTimeout(delay(fn), 0);
    return spec == null ? text('', node) : cases(spec, node, str(spec.widget));
  }

  /* Handle cases when spec is widget, tag, or text */
  function cases(spec, node, widget) {
    return widget[0] >= 'A' && widget[0] <= 'Z' ?
      spec.__ref = update(($[widget] || error)(spec), node) :
      spec.name ? spec.__ref = updateNode(spec, node) : text(str(spec), node);
  }

  /* Update a single node */
  function updateNode(next, node) {
    var k, n, p, nn, prev;

    /* Reuse the existent node or create a new one */
    node = node && eq(node.nodeName, next.name) ? node : next.xmlns ?
      d.createElementNS(next.xmlns, next.name) : d.createElement(next.name);

    /* Previous node spec */
    prev = obj(node.__spec);

    /* Attributes */
    n = obj(next.attrs), p = obj(prev.attrs);
    for (k in p) if (n[k] === _) node.removeAttribute(k);
    for (k in n) if (n[k] !== p[k]) node.setAttribute(k, n[k]);

    /* Childnodes */
    n = arr(next.nodes), p = node.childNodes;
    for (k = 0; k < n.length; k++) {
      nn = update(n[k], p[k]);
      if (nn !== p[k]) node.insertBefore(nn, p[k]);
    }
    while (p[k]) node.removeChild(p[k]);

    /* Properties */
    n = obj(next.props), p = obj(prev.props);
    for (k in p) if (n[k] === _) node[k] = null;
    for (k in n) if (n[k] !== p[k]) node[k] = n[k];

    /* Events */
    n = obj(next.events), p = obj(prev.events);
    for (k in p) if (n[k] !== p[k]) node.removeEventListener(k, p[k]);
    for (k in n) if (n[k] !== p[k]) node.addEventListener(k, n[k]);

    node.__spec = next;
    return node;
  }

  /* Update or create a DOM TextNode with the value */
  function text(v, n) {
    return n && n.nodeType === 3 ?
      (n.nodeValue !== v && (n.nodeValue = v), n) : d.createTextNode(v);
  }

  /* Compare strings case insensitive */
  function eq(a, b) { return str(a).toLowerCase() === str(b).toLowerCase() }

  /* Any to array */
  function arr(a) { return Array.isArray(a) ? a : a != _ ? [a] : 1 }

  /* Any to object */
  function obj(o) { return o != _ ? o : 1 }

  /* Any to string */
  function str(s) { return '' + s }

  /* Handles non existent widgets */
  function error(model) { w.console.error('Widget not found', model) }

  /* Call a function after rendering */
  function delay(fn) { return function() { d.body.clientWidth, fn() } }
})(this);
