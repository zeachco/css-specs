var path = require('path');
var renderer = require('./lib/renderer');
var server = require('./lib/server');
var logger = require('./lib/logger')('mainController');
var snapshot = require('./lib/snapshot');

server.start();

var config = require('./config');

var theme = 'appdirect';

var specs = require(path.join(process.cwd(), config.specsPath))

renderer('http://localhost:' + config.serverPort + '/compare?theme=' + theme, specs, function(snap) {
  snapshot.save(JSON.stringify(snap));
  logger(JSON.stringify(snap), 'blue');

  server.stop();
});
