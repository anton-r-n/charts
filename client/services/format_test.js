(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      format = T.format = {};

  format.humanize = function() {
    var i,
        d = [
          [1, '1'],
          [1.5, '1.5'],
          [12.125, '12.1'],
          [132.645, '133'],
          [1432, '1.43 k'],
          [15362, '15.4 k'],
          [183452, '184 k'],
          [2345921, '2.35 M'],
        ];
    for (i = 0; i < d.length; i++) {
      assert($.humanize(d[i][0]) === d[i][1],
          '$.humanize expected %s received %s', d[i][1], $.humanize(d[i][0]));
    }
  };

  format.percent = function() {
    assert($.percent(2.34) === '2.3%', '$.percent');
  };

  format.format = function() {
    var expected, received;

    expected = '235632';
    received = $.format(235632);
    assert(expected === received,
        '$.format #1 expected %s received %s', expected, received);

    expected = '236 k';
    received = $.format(235632, 'number');
    assert(expected === received,
        '$.format #2 expected %s received %s', expected, received);

    /*
    expected = '2017-08-05T18:08:46Z';
    received = $.format(new Date(1501956526349), 'datetime', 'ISO');
    assert(expected === received,
      '$.format #3 expected %s received %s', expected, received);
    */
  };
})(this);
