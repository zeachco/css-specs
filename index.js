var path = require('path');
var renderer = require('./lib/renderer');
var server = require('./lib/server');
var comparator = require('./lib/comparator');
var logger = require('./lib/logger')('css-specs', 'blue');
var snapshot = require('./lib/snapshot');
var utils = require('./lib/utils');

var config = require('./config');
var ran = false;

// setTimeout(function() {
//   if (!ran) {
//     logger('loading config from <' + process.cwd() + '/css-specs.conf>');
//     var theme = 'appdirect';
//     var specs = require(path.join(process.cwd(), config.specsPath))
//     server.start();
//     compare('http://localhost:' + config.serverPort + '/compare?theme=' + theme, specs, server.stop);
//   } else {
//     logger('using node manual execution');
//   }
// }, 0);

// function execSnapshot(url, specs, callback) {
//   ran = true;
//   logger('fetching <' + url + '> ...');
//   renderer(url, specs, function(snap) {
//     snapshot.save(JSON.stringify(snap));
//     if (typeof callback == 'function')
//       callback(snap);
//   });
// }

// function compare(url, css, specs, callback) {
//   ran = true;
//   logger('comparing <' + url + '> with last snapshot...');
//   renderer(url, specs, function(snap) {
//     var diff = comparator.compare(snap)
//     if (Object.keys(diff).length === 0) {
//       logger('✔ no diff detected', 'green');
//     } else {
//       logger('✗ diff detected', 'red');
//       logger(diff, 'red');
//     }
//     logger(JSON.stringify(snap));
//     if (typeof callback == 'function')
//       callback(snap);
//   });
// }

module.exports = {
  manual: function() {
    ran = true
  },
  log: require('./lib/logger'),
  renderer: renderer,
  snapshot: snapshot,
  // compare: compare,
  comparator: comparator,
  server: server,
  utils: utils,
};
