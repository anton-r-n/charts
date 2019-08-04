(function(w) {
  var $ = w.$ = w.$ || {};
  var d = w.document;

  function App(model) {
    this._width = $.contentWidth();
    this.model = {};
    this.prefix = '';
    this.initEventHandlers();
    $.events.init();
  }

  App.prototype = {
    render: function() {
      return {
        name: 'body',
        attrs: this.attrs(),
        props: this.props(),
        nodes: this.model.data,
      };
    },

    attrs: function() {
      var cls = ['evtKeydown', 'evtResize', 'evtEscape'];
      if (this.model._grid) {cls.push('grid')}
      if (this.modal) {cls.push('modal')}
      return cls.length > 0 ? {'class': cls.join(' ')} : null;
    },

    props: function() {
      return {
        'evtKeydown': this.keydown.bind(this),
        'evtResize': this.resize.bind(this),
        'evtEscape': this.escape.bind(this),
      };
    },

    keydown: function(e) {
      /* ctrl + comma */
      if (e.ctrlKey && e.key === ',') {
        this.model._grid = !this.model._grid;
        this.update();
      }
    },

    escape: function() {
      if (this.model._grid) {
        this.model._grid = false;
        this.update();
      }
    },

    click: function(e) {
      if ($.filterEvent(e)) {
        var link = $.closest(d.body, e.target, 'a[href]');
        if (link && !$.external(link)) {
          e.preventDefault();
          this.request(link.pathname + link.search);
          $.setLocation(link.pathname + link.search);
          w.scrollTo(0, 0);
        }
      }
    },

    update: function(data, callback) {
      this.model.data = data || this.model.data;
      $.update(this.render(), d.body, callback);
    },

    /* Make request with prefix specific for this component. */
    request: function(link) {
      var url = $.url(link);
      var req = (this.prefix + url.pathname).replace(/\/+/g, '/');
      $.requestJSON('GET', req + url.search, this.update).send();
    },

    popstate: function(e) {
      if (e.state) {
        this.request(location);
      }
    },

    resize: function() {
      var width = $.contentWidth();
      if (this._width !== width) {
        this._width = width;
        this.update();
      }
    },

    initEventHandlers: function() {
      /* Bind instance methods */
      'click,popstate,update'.split(',')
          .forEach(function(k) {this[k] = this[k].bind(this)}, this);

      /* Add listeners */
      'click,popstate'.split(',')
          .forEach(function(k) {w.addEventListener(k, this[k])}, this);
    },

    destroy: function() {
      /* Remove listeners */
      $.events.remove();
      'click,popstate'.split(',')
          .forEach(function(k) {w.removeEventListener(k, this[k])}, this);
    },
  };

  w.App = new App();
})(this);
