(function(w) {
  var $ = w.$ = w.$ || {};

  $.Form = function(model) {
    return new Form(model).render();
  };

  function Form(model) {
    this.model = $.obj(model);
    this.meta = $.obj(this.model.meta);
    this.submit = this.submit.bind(this);

    this.action = $.url(this.meta.action);
    this.method = this.meta.method.toLowerCase() === 'get' ? 'get' : 'post';
    this.enctype = this._enctype(this.meta.enctype);
    this.contentType = this.enctype === 'json' ?
        'application/json' : 'application/x-www-form-urlencoded';
  }

  Form.prototype._enctype = function(enctype) {
    switch (enctype) {
      case 'application/json': return 'json';
      case 'multipart/form-data': return 'multipart';
      case 'application/x-www-form-urlencoded': return 'urlencoded';
      default: return 'plain';
    }
  };

  Form.prototype.data = function(data) {
    if (this.enctype === 'json') {
      data = JSON.stringify(data);
      if (this.method === 'get') {
        data = $.buildQuery({'query': data});
      }
    }
    else {
      data = $.buildQuery(data);
    }
    return data;
  };

  Form.prototype.submit = function(e) {
    if (e.defaultPrevented) return;
    e.preventDefault();
    var xhr,
        loc,
        form = e.target,
        ajax = this.meta.ajax,
        data = this.data($.formData(form));

    if (this.method === 'get' && ajax === false) {
      loc = $.url(location);
      loc.search = data;
      $.setLocation(loc, true);
    }
    else {
      if (this.method === 'get') {
        this.action.search = data;
        data = null;
      }
      xhr = $.request(this.method, this.action, function(data) {
        App.update(data || {'nodes': 'Update Data Error'});
      });
      if (this.method === 'post') {
        xhr.setRequestHeader('Content-Type', this.contentType);
      }
      xhr.send(data);
    }
  };

  Form.prototype.render = function() {
    var cls = 'Form',
        model = this.model,
        nodes = model.nodes || [],
        title = this.meta.title,
        header = title ? $.n('h1', {'class': 'header'}, title) : '';

    if (model.meta.class) {
      if (model.meta.class.split(/\W/).indexOf('inline') > -1) {
        cls = 'InlineForm';
      }
      cls += ' ' + model.meta.class;
    }

    return {
      name: 'form',
      attrs: {
        'class': cls,
        'method': this.method,
        'action': this.action,
      },
      events: {'submit': this.submit},
      nodes: [header].concat(nodes),
    };
  };
})(this);
