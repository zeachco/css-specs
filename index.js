var path = require('path');
var renderer = require('./lib/renderer');
var server = require('./lib/server');
var comparator = require('./lib/comparator');
var logger = require('./lib/logger')('css-specs');
var snapshot = require('./lib/snapshot');

var config = require('./config');
var theme = 'appdirect';
var specs = require(path.join(process.cwd(), config.specsPath))

server.start();
compare('http://localhost:' + config.serverPort + '/compare?theme=' + theme, specs, function() {
  server.stop();
});

function snapshot(url, stylesheet, specs, callback) {
  logger('fetching <' + url + '> ...');
  renderer(url, specs, function(snap) {
    snapshot.save(JSON.stringify(snap));
  });
}

function compare(url, stylesheet, specs, callback) {
  logger('coparing <' + url + '> with last snapshot...');
  renderer(url, specs, function(snap) {
    var diff = comparator.compare(snap)
    if (Object.keys(diff).length === 0) {
      logger('✔ no diff detected', 'green');
    } else {
      logger(diff, 'red');
    }
    logger(JSON.stringify(snap), 'blue');
  });
}

module.exports = {
  snapshot: snapshot,
  compare: compare,
  server: server,
};
