var path = require('path');
var renderer = require('./lib/renderer');
var server = require('./lib/server');
var logger = require('./lib/logger')('mainController');

server.start();

var config = require('./config');

var theme = 'appdirect';

var specs = require(path.join(process.cwd(), config.specsPath))

renderer('http://localhost:' + config.serverPort + '/compare?theme=' + theme, specs, function(snapshot) {
  logger(JSON.stringify(snapshot), 'blue');
  server.stop();
});
