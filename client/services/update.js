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
    return spec == null ? text(spec, node) :
      spec.widget ? widget(spec, node, '' + spec.widget) :
        spec.name ? element(spec, node) :
          text(spec, node);
  }

  /* Handle cases when spec is widget */
  function widget(spec, node, wn) {
    var fn = wn[0] >= 'A' && wn[0] <= 'Z' ? $[wn] : err || err;
    return spec.__ref = update(fn(spec), node);
  }

  /* Update element node */
  function element(next, node, prev) {
    node = reuse(next, node);
    prev = node.__spec || 1;
    attrs(node, next.attrs || 1, prev.attrs || 1);
    nodes(node, arr(next.nodes), node.childNodes);
    props(node, next.props || 1, prev.props || 1);
    events(node, next.events || 1, prev.events || 1);
    return node.__spec = next, next.__ref = node;
  }

  /* Update node attrbutes */
  function attrs(node, n, p, k) {
    for (k in p) if (n[k] === _) node.removeAttribute(k);
    for (k in n) if (n[k] !== p[k]) node.setAttribute(k, n[k]);
  }

  /* Update child nodes */
  function nodes(node, n, p, k, nn) {
    for (k = 0; k < n.length; k++) {
      nn = update(n[k], p[k]);
      if (nn !== p[k]) node.insertBefore(nn, p[k]);
    }
    while (p[k]) node.removeChild(p[k]);
  }

  /* Update node properties */
  function props(node, n, p, k) {
    for (k in p) if (n[k] === _) node[k] = null;
    for (k in n) if (n[k] !== p[k]) node[k] = n[k];
  }

  /* Update node event listeners */
  function events(node, n, p, k) {
    for (k in p) if (n[k] !== p[k]) node.removeEventListener(k, p[k]);
    for (k in n) if (n[k] !== p[k]) node.addEventListener(k, n[k]);
  }

  /* Update or create a DOM TextNode with the value */
  function text(v, n) {
    v = v == null ? '' : v;
    return n && n.nodeType === 3 ?
      (n.nodeValue !== v && (n.nodeValue = v), n) : d.createTextNode(v);
  }

  /* Create or replace node */
  function reuse(spec, node) {
    var prev = node ? node.__spec || 1 : 1;
    var name = node ? node.nodeName.toLowerCase() : '';
    var reuse = spec.xmlns === prev.xmlns && spec.name === name;
    return reuse ? node : create(spec, node, spec.xmlns);
  }

  /* Create and replace node */
  function create(s, n, ns, e) {
    e = ns ? d.createElementNS(ns, s.name) : d.createElement(s.name);
    return n && n.parentNode && n.parentNode.replaceChild(e, n), e;
  }

  /* Any to array */
  function arr(a) { return Array.isArray(a) ? a : a != _ ? [a] : 1 }

  /* Handles non existent widgets */
  function err(model) { w.console.error('Widget not found', model) }

  /* Call a function after rendering */
  function delay(fn) { return function() { d.body.clientWidth, fn() } }
})(this);
