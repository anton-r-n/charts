(function(w) {
  /* Namespace */
  var Utils = w.Utils = w.Utils || {};

  Utils.defaultHeight = 120;

  Utils.widget = function(nodes, title, height) {
    return {
      'widget': 'Group',
      'title': title || '',
      'cls': 'widget',
      'height': height || Utils.defaultHeight,
      'nodes': nodes || '',
    };
  };
})(this);
