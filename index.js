var path = require('path');
var renderer = require('./lib/renderer');
var server = require('./lib/server');
var logger = require('./lib/logger')('mainController');
var config = require('./example/css-specs.conf.js');

logger('hello world');
server.start();
// setTimeout(server.stop, 2000);

var theme = 'appdirect';
var specs = {
  'h1': ['color', 'display']
};
renderer('http://localhost:5000/compare?theme=' + theme, specs, function(snapshot) {
  logger(JSON.stringify(snapshot), 'blue');
});
