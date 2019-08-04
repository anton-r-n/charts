(function(w) {
  /* Namespace */
  var $ = w.$ = w.$ || {};

  /*
    Expect only one MainModal per application
    so we can use global variable to avoid nested functions.
   */
  var model;

  /* Permanent root of stack of modal dialogs */
  $.MainModal = function(any) {
    model = $.obj(any);
    model.data = $.arr(model.data);
    var animated = model.animated ? ' animated' : '';
    return {
      name: 'div',
      attrs: {'class': 'MainModal evtModal' + animated},
      props: {'evtModal': push},
      nodes: model.data.length ? stack(model.data) : '',
    };
  };

  /* Stack handles the Escape event */
  function stack(data) {
    return {
      name: 'div',
      attrs: {'class': 'stack evtEscape'},
      props: {'evtEscape': pop},
      nodes: data.map(layer),
    };
  }

  /* Each modal dialog uses separated layer */
  function layer(node) {
    node = $.obj(node || 'empty content');
    return {
      name: 'div',
      attrs: {'class': 'modalLayer'},
      nodes: {
        name: 'div',
        attrs: {'class': 'modalContent'},
        nodes: [header(node.title), body(node)],
        events: {'mousedown': mousedown},
      },
    };
  }

  /* Header and close button */
  function header(title) {
    title = title ? '' + title : 'Modal Dialog';
    var close = $.n('div', {'class': 'MainBtn close'});
    return $.n('div', {'class': 'modalHeader'}, [title, close]);
  }

  /* Container for modal dialog body content */
  function body(node) {
    return $.n('div', {'class': 'modalBody'}, node);
  }

  /* Prevent all except close */
  function mousedown(e) {
    if ($.filterEvent(e)) {
      e.escapePrevented = true;
      if (e.target.className === 'MainBtn close') {
        pop();
      }
    }
  }

  /* Animation callback */
  function animate() {
    if (!model.animated) {
      model.animated = true;
      $.update(model, model.__ref);
    }
  }

  /* Pushes node in to stack of modal dialogs */
  function push(node) {
    model.data.push(node);
    model.animated = false;
    $.update(model, model.__ref, animate);
  }

  /* Pops the last node from stack of modal dialogs */
  function pop() {
    model.data.pop();
    $.update(model, model.__ref);
  }
})(this);
