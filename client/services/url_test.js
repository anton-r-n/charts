(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      url = T.url = {};

  url.test0 = function() {
    var u = $.url('http://sub.example.com:8453/pathname/dir?q=23#aaa');

    assert(u.protocol === 'http:', 'Protocol %s', u.protocol);
    assert(u.hostname === 'sub.example.com', 'Hostname %s', u.hostname);
    assert(u.port === '8453', 'Port %s', u.port);
    assert(u.pathname === '/pathname/dir', 'Pathname %s', u.pathname);
    assert(u.search === '?q=23', 'Search %s', u.search);
    assert(u.hash === '#aaa', 'Hash %s', u.search);
    assert(u.host === 'sub.example.com:8453', 'Host %s', u.host);
  };
})(this);
