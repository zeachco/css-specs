var path = require('path');
var renderer = require('./lib/renderer');
var server = require('./lib/server');
var comparator = require('./lib/comparator');
var logger = require('./lib/logger')('mainController');
var snapshot = require('./lib/snapshot');

server.start();

var config = require('./config');

var theme = 'appdirect';

var specs = require(path.join(process.cwd(), config.specsPath))

renderer('http://localhost:' + config.serverPort + '/compare?theme=' + theme, specs, function(snap) {
  // snapshot.save(JSON.stringify(snap));
  var diff = comparator.compare(snap)
  if (Object.keys(diff).length === 0) {
    logger('✔ no diff detected', 'green');
  } else {
    logger(diff, 'red');
  }
  logger(JSON.stringify(snap), 'blue');
  server.stop();
});
