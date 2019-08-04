(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      update = T.update = {};

  update.test0 = function() {
    try {
      $.update();
    } catch (e) {
      assert(e instanceof TypeError, '$.update: error check');
    }
  };

  update.test1 = function() {
    var node = $.update({name: 'div'});
    assert(node instanceof HTMLDivElement, '$.update: create element');
  };

  update.test2 = function() {
    var node = $.update({name: 'div', attrs: {'class': 't1'}});
    assert(node.className === 't1', '$.update: attributes');
  };

  update.test3 = function() {
    var node = $.update({name: 'div', props: {'p1': 'p1'}});
    assert(node.p1 === 'p1', '$.update: properties');
  };

  /*
  update.test4 = function() {
    var node = $.update({name: 'div', events: {'p1': 'p1'}});
    assert(node.p1 === 't1', '$.update: events');
  };
  */

  update.test5 = function() {
    var node = $.update({name: 'div', nodes: 't1'});
    assert(node.childNodes.length === 1, '$.update: child nodes');
    assert(node.childNodes[0].nodeType === 3, '$.update: child nodes');
    assert(node.childNodes[0].nodeValue === 't1', '$.update: child nodes');
  };

  update.test6 = function() {
    var node, n0, n1, n2, n3;

    node = $.update({name: 'div', nodes: [
      {name: 'div'},
      {name: 'div'},
      {name: 'div'},
    ]});

    n1 = node.childNodes[0];
    n2 = node.childNodes[1];
    n3 = node.childNodes[2];

    n0 = $.update({name: 'div', nodes: [
      {name: 'div'},
      {name: 'span'},
      {name: 'div'},
      {name: 'div'},
    ]}, node);

    assert(n0 === node, '$.update: preserve root');
    assert(node.childNodes.length === 4, '$.update: child nodes');
    assert(n1 === node.childNodes[0], '$.update: preserve firstChild');
    assert(node.childNodes[1].nodeName === 'SPAN', '$.update: update child');
    assert(n2 === node.childNodes[2], '$.update: preserve Child');
    assert(n3 === node.childNodes[3], '$.update: preserve Child');
  };

  update.test7 = function() {
    var node = $.update();
    assert(node.nodeName === '#text', '$.update: empty call');
  };

  /*
  update.test8 = function() {
    var node = $.update({'widget': 'Error'});
    assert(node.nodeName === 'SPAN', '$.update: accept widget');
  };
  */
})(this);
