(function(w) {
  var $ = w.$ = w.$ || {},
    d = w.document;


  /**
   * URL parser
   *
   * parser.protocol => "http:"
   * parser.hostname => "sub.example.com"
   * parser.port     => "8000"
   * parser.pathname => "/pathname/folder/"
   * parser.search   => "?search=t1&other=qwe+rty"
   * parser.hash     => "#hash"
   * parser.host     => "sub.example.com:8000"
   *
   * @param {String} url URL.
   * @return {Object} DOMHTMLAnchorElement.
   */
  $.url = function(url) {
    if (url && url.tagName === 'A') return url;
    var parser = d.createElement('a');
    parser.href = url;
    return parser;
  };
})(this);
