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
  /* Namespace, document, and undefined shortcuts */
  var $ = w.$ = w.$ || {}, d = w.document, _;

  /* Export */
  $.update = update;

  /* Update elt recursively according to spec */
  function update(spec, elt, fn) {
    if (typeof fn === 'function') callback(fn);
    return spec == null ? text(elt, '') :
      spec.widget ? widget(elt, spec, '' + spec.widget) :
        spec.name ? element(elt, spec) : text(elt, spec);
  }

  /* Call fn after rendering is done */
  function callback(fn) {
    w.setTimeout(function() { d.body.clientWidth, fn() }, 0);
  }

  /* Handle cases when spec is widget */
  function widget(elt, spec, wn) {
    var fn = wn[0] >= 'A' && wn[0] <= 'Z' ? $[wn] : err || err;
    return spec.__ref = update(fn(spec), elt);
  }

  /* Update element node */
  function element(elt, next, prev) {
    elt = reuse(elt, next);
    prev = elt.__spec || 1;
    nodes(elt, arr(next.nodes), elt.childNodes);
    attrs(elt, next.attrs || 1, prev.attrs || 1);
    props(elt, next.props || 1, prev.props || 1);
    events(elt, next.events || 1, prev.events || 1);
    return elt.__spec = next, next.__ref = elt;
  }

  /* Create or replace elt node */
  function reuse(elt, next) {
    var prev = elt ? elt.__spec || 1 : 1;
    var name = elt ? (elt.nodeName || '').toLowerCase() : '';
    var reuse = next.xmlns === prev.xmlns && next.name === name;
    return reuse ? elt : create(elt, next.name, next.xmlns);
  }

  /* Create and replace elt node */
  function create(elt, name, ns) {
    var e = ns ? d.createElementNS(ns, name) : d.createElement(name);
    return elt && elt.parentNode && elt.parentNode.replaceChild(e, elt), e;
  }

  /* Update child nodes */
  function nodes(elt, n, p, k, nn) {
    for (k = 0; k < n.length; k++) {
      nn = update(n[k], p[k]);
      if (nn !== p[k]) elt.insertBefore(nn, p[k]);
    }
    while (p[k]) elt.removeChild(p[k]);
  }

  /* Update elt attrbutes */
  function attrs(elt, n, p, k) {
    for (k in p) if (n[k] === _) elt.removeAttribute(k);
    for (k in n) if (n[k] !== p[k]) elt.setAttribute(k, n[k]);
  }

  /* Update elt properties */
  function props(elt, n, p, k) {
    for (k in p) if (n[k] === _) elt[k] = null;
    for (k in n) if (n[k] !== p[k]) elt[k] = n[k];
  }

  /* Update elt event listeners */
  function events(elt, n, p, k) {
    for (k in p) if (n[k] !== p[k]) elt.removeEventListener(k, p[k]);
    for (k in n) if (n[k] !== p[k]) elt.addEventListener(k, n[k]);
  }

  /* Update or create a DOM TextNode with the value */
  function text(elt, v) {
    return elt && elt.nodeType === 3 ?
      (elt.nodeValue !== v && (elt.nodeValue = v), elt) : d.createTextNode(v);
  }

  /* Any to array */
  function arr(a) { return Array.isArray(a) ? a : a != _ ? [a] : 1 }

  /* Handles non existent widgets */
  function err(model) { w.console.error('Widget not found', model) }
})(this);
