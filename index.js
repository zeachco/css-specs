var path = require('path');
var colors = require('colors');

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.end('yay');
});

app.get('/__log', function(req, res) {
  console.log('log...'.red, req.params);
  res.end('yay');
});

var port = 5000;
var server = app.listen(port);

console.log(`server runs at http://localhost:${port}/`.blue);
setTimeout(function() {
  console.log('closing server'.yellow);
}, 10000);

var phantomjs = require('phantomjs');
var childProcess = require('child_process')
console.log(`using phantomjs v${phantomjs.version}`.blue);

var childArgs = [
  path.join(__dirname, 'test.js'),
  'http://localhost:' + port
]

var result = '';
var processResult = function(stdout) {
  console.log(stdout);
};

childProcess.execFile(phantomjs.path, childArgs,
  function(err, stdout, stderr) {
    // console.log(arguments);
    processResult(stdout);
    if (err) {
      console.log(err.red);
    }
  });
