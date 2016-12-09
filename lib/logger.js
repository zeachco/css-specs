var colors = require('colors/safe');
/* eslint no-console: 0 */

function Logger(prefix, prefixColor) {
  prefix = prefix || 'log';
  prefixColor = prefixColor || 'gray';
  var logger = function(msg, color) {
    var now = (new Date()).toLocaleString();
    var stamp = now.split(',')[1].trim();
    var parser = colors[prefixColor];
    stamp += ' [ ' + parser(prefix.toUpperCase()) + ' ] ';
    parser = colors[color || prefixColor];
    if (typeof msg === 'string')
      console.log(stamp + parser(msg));
    else
      console.log(stamp + parser(JSON.stringify(msg, null, 4)));
  };
  logger.timer = timer;
  return logger;
}

Logger.timer = timer;

function timer(label, color) {
  var now = (new Date()).toLocaleString();
  var stamp = now.split(',')[1].trim();
  label = stamp + ' [ ' + colors[color || 'blue']('STATS') + ' ] ' + label;
  console.time(label);
  return function() {
    console.timeEnd(label);
  };
}

module.exports = Logger;
