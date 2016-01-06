var path = require('path');
var renderer = require('./lib/renderer');
var server = require('./lib/server');
var logger = require('./lib/logger')('mainController');

server.start();

var config = require('./config');
logger(config, 'orange');

var theme = 'appdirect';
var specs = {
  'h1': ['color', 'display']
};
renderer('http://localhost:5000/compare?theme=' + theme, specs, function(snapshot) {
  logger(JSON.stringify(snapshot), 'blue');
});
