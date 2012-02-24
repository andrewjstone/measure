var measure = require('../index'),
    assert = require('assert');

describe('measure a 500 ms timeout', function() {
  it('should take approximately 500 ms', function(done) {
    var stop = measure.measure('test1');
    setTimeout(function() {
      var duration = stop();
      assert.ok(duration >= 400);
      assert.ok(duration <= 750);
      var stats = measure.stats('test1');
      assert.equal(stats.ct, 1);
      assert.equal(stats.total, duration);
      assert.equal(stats.max, duration);
      assert.equal(stats.min, duration);
      done();
    }, 500);
  });
});
