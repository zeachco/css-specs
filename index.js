var path = require('path');
var renderer = require('./lib/renderer');
var logger = require('./lib/logger')('mainController');
var config = require('./example/css-specs.conf.js');

logger('hello world');

var theme = 'adp';
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
