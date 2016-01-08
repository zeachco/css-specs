var log = require('./logger')('reporter', 'yellow');
var colors = require('colors');
module.exports = function(diff) {
  var keys = Object.keys(diff);
  var count = 0;
  var timer = log.timer('reporting');
  if (keys.length === 0) {
    log('✔ no diff detected', 'green');
  } else {
    log('✗ build doesn\'t match!', 'red');
    console.log('');
    keys.forEach(function(key) {
      var rules = Object.keys(diff[key]);
      console.log(' Changes for selector "' + key + '"');
      rules.forEach(function(rule) {
        count++;
        console.log('  ' + rule + ': ' + diff[key][rule].expected.green + ' or ' + diff[key][rule].actual.red + ' ?');
      });
    });
  }
  console.log('');
  log('Broken rules: ' + count);
  log('Affected selectors: ' + keys.length);
  timer();
}
