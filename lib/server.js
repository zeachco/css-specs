var express = require('express');
var Logger = require('./logger');

module.exports = {
  start: function(port, logger) {

    // creating server
    var app = express();
    var server;

    app.get('/', function(req, res) {
      server.log('file fetched', 'red');
      res.end('yay');
    });
    app.get('/__log', function(req, res) {
      server.log('log...' + JSON.stringify(req.params), 'red');
      res.end('yay');
    });

    server = app.listen(port);
    server.log = Logger('server');
    server.log(`server runs at http://localhost:${port}/`, 'green');

    // force shutdown after 10 secs
    setTimeout(function() {

      logger('closing server', 'yellow');
    }, 10000);
    return server;
  }
}
