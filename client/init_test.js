(function(w) {
  var T = w.T = w.T || {};

  setTimeout(function() {
    var d = new Date(),
        n = 0,
        module,
        test;

    for (module in T) {
      for (test in T[module]) {
        T[module][test]();
        n++;
      }
    }
    console.log(n + ' tests in ' + (new Date() - d) + 'ms');
  }, 0);
})(this);
