var log = require('./logger')('reporter', 'yellow');
var colors = require('colors');
module.exports = function(diff) {
  var keys = Object.keys(diff);
  if (keys.length === 0) {
    log('✔ no diff detected', 'green');
  } else {
    log('✗ build doesn\'t match!', 'red');
    keys.forEach(function(key) {
      var rules = Object.keys(diff[key]);
      log(key + ' contains differences', 'red');
      rules.forEach(function(rule) {
        log( colors.yellow(rule) +
          ' expect ' + colors.green(diff[key][rule].expected) +
          ' but is ' + colors.red(diff[key][rule].actual), 'white');
      });
    });
  }
}
