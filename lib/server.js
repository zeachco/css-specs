var express = require('express');
var Logger = require('./logger');
var logger = Logger('server');
var fs = require('fs');
var port = 5000;

// creating server
var app = express();
var server;
var pathToStatic = './static/';

app.use(express.static('./static/themes'));

app.get('/compare', function(req, res) {
  var themeFile = req.query.theme;
  fs.readFile(pathToStatic + 'html/index.html', 'utf8', function(err, template) {
    if (err) {
      return res.status(500).json(err);
    }
    var parts = template.split('</head>');
    parts[0] += '<link rel="stylesheet" type="text/css" href="' + themeFile + '.css">';
    res.send(parts.join('</head>'));
  });
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
