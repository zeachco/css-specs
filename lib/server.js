var express = require('express');
var http = require('http');
var logger = require('./logger')('server', 'magenta');
var fs = require('fs');
var port = 5000;

var app = express();
var server;
var fileToServe;

app.get('/*', function(req, res) {
  fs.readFile(fileToServe, 'utf8', function(err, template) {
    if (err) {
      logger(err, 'red');
      return res.status(500).json(err);
    }
    res.send(template);
  });
});

module.exports = {
  serve: function(file) {
    var url = 'http://127.0.0.1:' + port;
    fileToServe = file;
    server = http.createServer(app).listen(port);
    logger('Spawning server at ' + url, 'yellow');
    return url;
  },
  stop: function() {
    if (server) {
      logger('closing server', 'yellow');
      server.close();
    } else {
      logger('server was not running', 'red');
    }
  }
};