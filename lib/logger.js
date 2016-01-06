var colors = require('colors/safe');

module.exports = function Logger(prefix, prefixColor) {
  var logger = function(msg, color) {
    var now = (new Date()).toLocaleString();
    var stamp = now.split(',')[1].trim();
    var parser = colors[prefixColor || 'grey'];
    stamp = parser(prefix) + ' ' + stamp;
    parser = colors[color || 'blue'];
    if (typeof msg === 'string')
      console.log(stamp + ' ' + parser(msg));
    else
      console.log(stamp + ' ' + parser(JSON.stringify(msg)));
  };
  return logger;
};
