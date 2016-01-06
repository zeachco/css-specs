var colors = require('colors/safe');

module.exports = function Logger(prefix, prefixColor) {
  var logger = function(msg, color) {
    var now = (new Date()).toLocaleString();
    var stamp = now.split(',')[1].trim();
    var parser = colors[prefixColor || 'grey'];
    stamp = parser(prefix) + ' ' + stamp;
    parser = colors[color || 'red'];
    console.log(stamp + parser(typeof msg === 'object' ? ' %j' : ' %s'), msg);
  };
  return logger;
};
