(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      forms = T.forms = {};

  forms.parseQuery = function() {
    var q = $.parseQuery('q=1&r=2&r=3');
    assert(q.q[0] === '1', 'parseQuery');
    assert(q.r[0] === '2', 'parseQuery');
    assert(q.r[1] === '3', 'parseQuery');
  };

  forms.buildQuery = function() {
    var q = $.buildQuery({a: 1, b: [2, 3]});
    assert(q === 'a=1&b=2&b=3', 'buildQuery');
  };
})(this);
