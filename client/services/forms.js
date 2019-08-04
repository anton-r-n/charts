(function(w) {
  var $ = w.$ = w.$ || {};


  /**
   * Parse Query string to object
   * @param {String} query.
   * @return {Object} params.
   */
  $.parseQuery = function(query) {
    var i,
        name,
        pair,
        params = {},
        fields = query.split('&');
    for (i = 0; i < fields.length; i++) {
      pair = fields[i].split('=');
      name = decodeURIComponent(pair[0]);
      params[name] = params[name] || [];
      params[name].push(decodeURIComponent(pair[1]));
    }
    return params;
  };


  /**
   * Build query string from object
   * @param {Object} params.
   * @return {String} query.
   */
  $.buildQuery = function(params) {
    var i, name, values, q = [];
    for (name in params) {
      values = Array.isArray(params[name]) ? params[name] : [params[name]];
      for (i = 0; i < values.length; i++) {
        q.push(encodeURIComponent(name) + '=' + encodeURIComponent(values[i]));
      }
    }
    return q.join('&');
  };


  /**
   * Collects a form field values into an object.
   * @param {HTMLFormElement} form Form element.
   * @return {Object} key value map of form values.
   */
  $.formData = function(form) {
    var i, node, value,
        data = {},
        fields = form.querySelectorAll('[name]');
    for (i = 0; i < fields.length; i++) {
      node = fields[i];
      if (node.name) {
        if (node.nodeName === 'INPUT') {
          if (node.type === 'checkbox' || node.type === 'radio') {
            if (!node.checked) {
              continue;
            }
          }
        }
        value = node.hasOwnProperty('data-value') ?
            node['data-value'] : node.value;
        data[node.name] = data[node.name] || [];
        data[node.name].push(value);
      }
    }
    return data;
  };
})(this);
