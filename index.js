var path = require('path');
// var server = require('./lib/server');
var Logger = require('./lib/logger');
var logger = Logger('jquery');

var $ = require('jquerygo');

var specs = {
  'h1': ['font-size', 'display']
};

function phantomscript() { // phantom context
  // document.querySelector()
  console.log(JSON.stringify(window.spec));
  var snap = {};
  for (var n in window.spec) {
    var node = document.querySelector(n);
    var rules = window.spec[n];
    var computed = getComputedStyle(node);
    snap[n] = {};
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      snap[n][rule] = computed[rule];
    }
  }
  return snap;
}

function nodescript(val) {
  logger(val, 'blue');
}

$.visit('http://127.0.0.1:5000/compare?theme=' + cssFile, function() {
  $.getPage(function(page) {
    $('body').append('<script type="text/javascript">window.spec = ' + JSON.stringify(specs) + '</script>', function() {

    });
    page.evaluate(phantomscript, nodescript);
  });
});

//
// function Runtime() {
//   var self = this;
//   this.template = function(file) {
//     this.template = file;
//     self.log(`template: ${file}`, 'yellow');
//   };
//   this.compare = function(base, specs) {
//     self.log(`compare: ${base} ~= ${specs}`, 'yellow');
//
//     // start phantom and load templates
//     var phantomjs = require('phantomjs');
//     var childProcess = require('child_process')
//     console.log(`using phantomjs v${phantomjs.version}`.blue);
//
//     var childArgs = [
//       path.join(__dirname, 'test.js'),
//       'http://localhost:' + 5000, {
//         sub: function() {
//           console.log('yay it works');
//         }
//       }
//     ]
//
//     var result = '';
//     var processResult = function(stdout) {
//       self.log(stdout, 'blue');
//     };
//
//     childProcess.execFile(phantomjs.path, childArgs,
//       function(err, stdout, stderr) {
//         processResult(stdout);
//         if (err) {
//           self.log(err, 'red');
//         }
//       });
//   };
//   this.log = Logger('test');
// }
//
// module.exports = {
//   runtime: Runtime
// };
