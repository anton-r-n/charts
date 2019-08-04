(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      misc = T.misc = {};

  misc.arrMin = function() {
    assert($.arrMin([1, 2, 3]) === 1, 'arrMin');
  };

  misc.arrMax = function() {
    assert($.arrMax([1, 2, 3]) === 3, 'arrMax');
  };

  misc.arrSum = function() {
    assert($.arrSum([1, 2, 3]) === 6, 'ArrSum');
  };

  misc.round = function() {
    assert($.round(2.3123, 1) === 2.3, 'Round');
  };

  misc.randomId = function() {
    assert(typeof $.randomId() === 'string', 'Random id is not string');
    assert($.randomId() !== $.randomId(), 'Random id is not unique');
  };

  misc.misc = function() {
    var obj1 = {},
        obj2 = 2;

    assert(typeof $.obj().t === 'undefined', 'Empty obj');
    assert(typeof $.obj(null).t === 'undefined', 'Null obj');
    assert(typeof $.obj(undefined).t === 'undefined', 'Undefined obj');
    assert($.obj(obj1) === obj1, 'Object obj');
    assert($.obj(obj2) === obj2, 'Number obj');
  };
})(this);
