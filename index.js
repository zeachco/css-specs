var path = require('path');
var renderer = require('./lib/renderer');
var logger = require('./lib/logger')('mainController');
var config = require('./example/css-specs.conf.js');

logger('hello world');

var theme = 'adp';
var specs = {
  'h1': ['font-size', 'display']
};
renderer('http://perdu.com', specs, function(snapshot) {
  logger(JSON.stringify(snapshot), 'blue');
});
