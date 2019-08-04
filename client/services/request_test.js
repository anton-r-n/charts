(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      request = T.request = {};

  request.instance = function() {
    assert($.request() instanceof XMLHttpRequest, 'XMLHttpRequest');
  };
})(this);
