var logger = require('./lib/logger')('config');
var config = require(process.cwd() + '/css-specs.conf');
logger(config, 'blue');
module.exports = config;
