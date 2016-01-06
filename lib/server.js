var express = require('express');
var Logger = require('./logger');
var http = require('http');
var logger = Logger('server');
var fs = require('fs');
var port = 5000;

var app = express();
var server;
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

module.exports = {
  start: function() {
    server = http.createServer(app).listen(port);
    logger('server runs at http://localhost:' + port, 'green');
  },
  stop: function() {
    logger('closing server', 'yellow');
    server.close();
  }
};
