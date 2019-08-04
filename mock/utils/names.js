(function(w) {
  /* Namespace */
  var Utils = w.Utils = w.Utils || {};


  var names = [
    'Viwers',
    'Exits',
    'Uniques',
    'Devices',
    'Metrics',
    'Errors',
    'Reports',
    'Events',
    'Producers',
    'Receivers',
    'CDNs',
    'ASNs',
    'ISPs',
  ];

  Utils.randName = function() {
    return names[Math.floor(Math.random() * names.length)];
  };
})(this);
