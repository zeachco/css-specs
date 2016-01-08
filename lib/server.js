var express = require('express');
var http = require('http');
var logger = require('./logger')('server', 'green');
var fs = require('fs');
var port = 5000;

var app = express();
var server;
var fileToServe;
var pathToStatic = './../static/';

app.use(express.static(pathToStatic + 'themes'));

app.get('/compare', function(req, res) {
  var themeFile = req.query.theme;
  fs.readFile(pathToStatic + 'html/index.html', 'utf8', function(err, template) {
    if (err) {
      logger(err, 'red');
      return res.status(500).json(err);
    }
    var parts = template.split('</head>');
    parts[0] += '<link rel="stylesheet" type="text/css" href="' + themeFile + '.css">';
    res.send(parts.join('</head>'));
  });
});

app.get('/', function(req, res) {
  fs.readFile(fileToServe, 'utf8', function(err, template) {
    if (err) {
      logger(err, 'red');
      return res.status(500).json(err);
    }
    res.send(template);
  });
})

module.exports = {
  start: function(file) {
    fileToServe = file;
    server = http.createServer(app).listen(port);
    var url = 'http://127.0.0.1:' + port;
    logger('server runs at ' + url, 'green');
    return url
  },
  stop: function() {
    logger('closing server', 'yellow');
    if (server)
      server.close();
    delete server;
  }
};
