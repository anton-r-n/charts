(function(w) {
  var $ = w.$ = w.$ || {};
  var TIMEOUT = 30000;

  /**
   * Creates a request
   * @param {String} method HTTP Method.
   * @param {String} url URL.
   * @param {Function} fn Callback function.
   * @return {Object} XMLHttpRequest instance.
   */
  $.request = function(method, url, fn) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
      xhr.readyState === 4 && fn instanceof Function && fn(xhr);
    };
    return xhr;
  };


  function json(xhr, fn) {
    var data = {widget: 'Error', data: 'Data error'};
    try {
      data = JSON.parse(xhr.responseText);
    } catch (e) {
      data.data = [
        'Response Error',
        'Response Status: ' + xhr.status + ' ' + xhr.statusText,
        'Resource: ' + xhr.responseURL,
      ].join('\n');
    }
    fn(data);
  }

  function redirect(xhr, fn) {
    var redirect = xhr.getResponseHeader('X-Location');
    if (redirect) {
      $.setLocation(redirect);
      $.request(method, redirect, fn);
    }
  }

  $.requestJSON = function(method, url, fn) {
    return $.request(method, url, function(xhr) {
      return (fn instanceof Function) ? json(xhr, fn) : xhr;
    });
  };

  $.redirect = function(method, url, fn) {
    return $.request(method, url, function(xhr) {
      return redirect(xhr, fn);
    });
  };
})(this);
