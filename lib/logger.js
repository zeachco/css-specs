var colors = require('colors/safe');

module.exports = function Logger(prefix, prefixColor) {
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
  return logger;
};
