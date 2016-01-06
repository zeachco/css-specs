var path = require('path');
var logger = require('./logger')('renderer');
var $ = require('jquerygo');

// USAGE EXAMPLE 
// var theme = 'adp';
// var specs = {
//   'h1': ['font-size', 'display']
// };
// renderer('http://localhost:5000?theme=' + theme, specs, function(snapshot) {
//   logger(JSON.stringify(snapshot), 'blue');
// });

module.exports = renderer;

function renderer(url, specs, callback) {
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

  $.visit('http://perdu.com', function() {
    $.getPage(function(page) {
      $('body').append('<script type="text/javascript">window.spec = ' + JSON.stringify(specs) + '</script>', function() {
        logger('specs injected', 'blue');
      });
      var result = page.evaluate(phantomscript);
      logger(result, 'red');
      page.evaluate(phantomscript, callback);
      $.close();
    });
  });
}
