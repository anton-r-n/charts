(function(w) {
  var $ = w.$ = w.$ || {};
  var Mock = w.Mock = w.Mock || {};
  var Utils = w.Utils = w.Utils || {};

  function Request(method, url, callback) {
    this.method = method;
    this.url = url;
    this.callback = callback;
    this.data = null;
  };

  Request.prototype = new XMLHttpRequest();

  Request.prototype.send = function(data) {
    var self = this;
    var method = this.method.toUpperCase();
    if (method === 'POST' || method === 'PUT') {
      this.data = data;
    }
    if (self.callback instanceof Function) {
      data = mux(self, self.url);
      w.setTimeout(function() {
        console.log('XHR:', self.method, self.url);
        self.callback(data);
      }, 0);
    }
  };

  $.request = $.requestJSON = function(method, url, callback) {
    return new Request(method, url, callback);
  };

  function mux(request, url) {
    url = $.url(url);
    var path = url.pathname.split('/');
    if (path[1] !== 'api') return Utils.error(request.url);
    return (Mock[path[2]] || Mock.main)(request, path.slice(2));
  }
})(this);
