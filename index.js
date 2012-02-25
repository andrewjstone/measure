// This module is an *instance* of EventEmitter2

var EventEmitter = require('eventemitter2').EventEmitter2;

var ee = module.exports = new EventEmitter({
  wildcard: true
});
ee.measure = measure;
ee.stats = stats;
ee.clear = clear;

var statistics = {};

function measure(key) {
  if (!key) throw('measure requires a key');
  var start = Date.now();

  return function() {
    var duration = Date.now() - start;
    update_stats(key, duration);
    ee.emit(key, duration);
    return duration;
  };
}

function stats(key) {
  if (key) return statistics[key];
  return statistics;
}

function update_stats(key, duration) {
  var measurement = statistics[key];
  if (measurement) {
    measurement.ct++;
    measurement.total += duration;
    if (duration > measurement.max) measurement.max = duration;
    if (duration < measurement.min) measurement.min = duration;
  } else {
    statistics[key] = {
      ct: 1,
      total: duration,
      max: duration,
      min: duration 
    }
  }
}

function clear(key) {
  if (key) {
    delete statistics[key];
    return;
  }
  statistics = {};
}

