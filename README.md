This simple module mesures the duration of javascript operations. 
The module itself is an instance of [EventEmitter2](https://github.com/hij1nx/EventEmitter2).

# Example

```javascript
var measure = require('measure');
var done = measure.measure('timeconsuming.operation');

measure.on('timeconsuming.*', function(duration) {
  console.log(duration); // same value as returned from done()
});

setTimeout(function() {
  var duration = done();
  console.log(duration); // ~1000 
}, 1000);
```

# API

## measure(key)

Start the measurement using the string ```key```
Returns a function to be called when the measurement is complete.

## stats([key])

Return the statistics for the given key or statistics for all keys if none is given.

## clear([key])

Clear stats for the given key or all keys if none is given.

# Install

    npm install measure

# Run Tests

    mocha tests/measure.test.js --reporter spec

# License

MIT/X11
