var measure = require('../index'),
    assert = require('assert');

describe('measure a 500 ms timeout', function() {

  it('should take approximately 500 ms', function(done) {
    var stop = measure.measure('test1');
    setTimeout(function() {
      var duration = stop();
      assert.ok(duration >= 90);
      assert.ok(duration <= 200);
      var stats = measure.stats('test1');
      assert.equal(stats.ct, 1);
      assert.equal(stats.total, duration);
      assert.equal(stats.max, duration);
      assert.equal(stats.min, duration);
      done();
    }, 100);
  });

  it('should announce an event for test1', function (done) {
    measure.on('test2', function(duration) {
      assert.ok(duration >= 90);
      assert.ok(duration <= 200);
      done();
    });
    var stop = measure.measure('test2');
    setTimeout(function() {
       stop();
    }, 100);
  });
});
