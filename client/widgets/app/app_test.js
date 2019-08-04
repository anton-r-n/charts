(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      app = T.app = {};

  app.init = function() {
    assert(w.App && typeof w.App === 'object', 'App is missing');
    assert(typeof w.App.model === 'object', 'App.model is missing');
  };
})(this);
