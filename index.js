var path = require('path');
var server = require('./lib/server');
var Logger = require('./lib/logger');

function Runtime() {
  var self = this;
  this.template = function(file) {
    self.log(`template: ${file}`, 'yellow');
  };
  this.compare = function(base, specs) {
    self.log(`compare: ${base} ~= ${specs}`, 'yellow');

    // start phantom and load templates
    var phantomjs = require('phantomjs');
    var childProcess = require('child_process')
    console.log(`using phantomjs v${phantomjs.version}`.blue);

    var childArgs = [
      path.join(__dirname, 'test.js'),
      'http://localhost:' + 5000
    ]

    var result = '';
    var processResult = function(stdout) {
      self.log(stdout, 'blue');
    };

    childProcess.execFile(phantomjs.path, childArgs,
      function(err, stdout, stderr) {
        processResult(stdout);
        if (err) {
          self.log(err, 'red');
        }
      });
  };
  this.log = Logger('test');
  this.server = server.start(5000, self.log);
}

module.exports = {
  runtime: Runtime
};
