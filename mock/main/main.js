(function(w) {
  var Data = w.Data = w.Data || {};
  var Mock = w.Mock = w.Mock || {};
  var Pages = w.Pages = w.Pages || {};
  var Utils = w.Utils = w.Utils || {};

  Mock.main = function(request, path) {
    return path[0] === 'main' ? index(path[1]) : wrapper(path[0]);
  };

  function wrapper(path) {
    return {
      'widget': 'Main',
      'title': 'Test App',
      'prefix': '/api/main/',
      'menu': menu(),
      'data': index(path),
    };
  }

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

  function menu() {
    var key, links = [];
    for (key in w.Pages) {
      if (key !== '') {
        links.push({
          title: w.Pages[key].menu.title,
          idx: w.Pages[key].menu.idx,
          key: key,
        });
      }
    }
    return { items: links.sort(order).map(link) };
  }

  function link(a) { return {title: a.title, link: '/' + a.key + '/'} }

  function order(a, b) { return a.idx - b.idx }
})(this);
