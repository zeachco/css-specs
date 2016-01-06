var express = require('express');
var Logger = require('./logger');
var logger = Logger('server');
var port = 5000;

// creating server
var app = express();
var server;

app.get('/:cssFile', function(req, res) {
  // req.params.cssFile
  logger('file fetched', 'red');
  res.end('yay');
});
app.get('/__log', function(req, res) {
  logger('log...' + JSON.stringify(req.params), 'red');
  res.end('yay');
});

server = app.listen(port);
logger(`server runs at http://localhost:${port}/`, 'green');

// force shutdown after 10 secs
setTimeout(function() {

  logger('closing server', 'yellow');
}, 10000);
return server;

module.exports = server;
