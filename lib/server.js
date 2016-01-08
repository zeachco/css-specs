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
})

module.exports = {
  serve: function(file) {
    fileToServe = file;
    server = http.createServer(app).listen(port);
    var url = 'http://127.0.0.1:' + port;
    logger('Spawning server at ' + url, 'yellow');
    return url
  },
  stop: function() {
    logger('closing server', 'yellow');
    if (server)
      server.close();
    delete server;
  }
};
