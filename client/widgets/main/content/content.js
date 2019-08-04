(function(w) {
  var $ = w.$ = w.$ || {};

  var asideWidth = 352;

  /* Combine header, body, and aside */
  $.MainContent = function(any) {
    var model = $.obj(any);
    var data = $.obj(model.data);
    data._width = width(w.App._width, model._aside);

    var header = {widget: 'MainHeader', title: model.title};
    var body = $.n('div', {'class': 'body'}, data);
    var aside = model._aside ? {widget: 'MainAside'} : '';
    var cls = 'MainContent' + (model._aside ? ' withAside' : '');
    return $.n('div', {'class': cls}, [header, body, aside]);
  };

  function width(appWidth, open) {
    return open && appWidth > 700 ? appWidth - asideWidth : 0;
  }
})(this);
