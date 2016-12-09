var log = require('./logger')('reporter', 'yellow');
var colors = require('colors');
/* eslint no-console: 0 */
module.exports = function(diff) {
  var keys = Object.keys(diff);
  var count = 0;
  var timer = log.timer('reporting');
  if (keys.length === 0) {
    log('✔ no diff detected', 'green');
  } else {
    log('✗ build doesn\'t match!', 'red');
    console.log('\nREPORT\n' + colors.white.bgBlack(' [selector] ') + '\n  [attribute] ' + '[actual] '.red + '[expected]'.green);
    keys.forEach(function(key) {
      var rules = Object.keys(diff[key]);
      console.log(colors.white.bgBlack('\n ' + key + ' '));
      rules.forEach(function(rule) {
        count++;
        var expected = pretty(diff[key][rule].expected);
        var actual = pretty(diff[key][rule].actual);
        console.log('  ' + rule + ': ' + actual.red + ' ' + expected.green);
      });
    });
  }
  console.log('');
  var c = count === 0 ? 'green' : 'red';
  log('Broken rules: ' + count, c);
  log('Affected selectors: ' + keys.length, c);
  timer();
};

function pretty(val) {
  if (typeof val !== 'string') {
    val = JSON.stringify(val, null, 4);
  }
  return val;
}