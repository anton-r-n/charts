(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      range = T.range = {};

  /*
  range.test0 = function() {
    assert('' + $.range() === '', '$.range()');
  };
  */

  range.test1 = function() {
    assert('' + $.range(0, 3) === '0,1,2', '$.range(3)');
  };

  range.test2 = function() {
    assert('' + $.range(1, 4) === '1,2,3', '$.range(1, 4)');
  };

  range.test3 = function() {
    assert('' + $.range(1, 6, 2) === '1,3,5', '$.range(1, 6, 2)');
  };

  range.test4 = function() {
    assert('' + $.range(-1, 5, 2) === '-1,1,3', '$.range(-1, 5, 2)');
  };

  range.test5 = function() {
    assert('' + $.range(6, 0, -3) === '6,3', '$.range(6, 0, -3)');
  };

  range.test6 = function() {
    assert('' + $.range(1.5, 3, 0.5) === '1.5,2,2.5', '$.range(1.5, 3, 0.5)');
  };

  range.test7 = function() {
    var _, arr, err;
    try {
      arr = $.range(6, 0, 3);
    } catch (e) {
      err = e;
    }
    assert(arr === _ && err !== _, '$.range(6, 0, 3)');
  };

  range.test8 = function() {
    var _, arr, err;
    try {
      arr = $.range('a', 'f', 'd');
    } catch (e) {
      err = e;
    }
    assert(arr === _ && err !== _, '$.range(a, f, d)');
  };

  range.test9 = function() {
    var _, arr, err;
    try {
      arr = $.range(1 / 0);
    } catch (e) {
      err = e;
    }
    assert(arr === _ && err !== _, '$.range(1/0)');
  };
})(this);
