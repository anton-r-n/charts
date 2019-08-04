(function(w) {
  var Data = w.Data = w.Data || {};
  var Mock = w.Mock = w.Mock || {};
  var Utils = w.Utils = w.Utils || {};

  Mock.dashboard = function(request, path) {
    return path[0] === 'dashboard' ? index(path[1]) : Utils.error(request.url);
  };

  function index(i) {
    var page = Pages[i];
    return page ? traverse(page) : Utils.error(i);
  }

  function traverse(obj) {
    var key, res, w;
    if (Array.isArray(obj)) {
      return obj.map(traverse);
    }
    if (obj instanceof Object) {
      if (obj.metrics) {
        return Data[obj.data](obj);
      }
      res = {};
      for (key in obj) {
        res[key] = traverse(obj[key]);
      }
      return res;
    }
    return obj;
  }
})(this);
