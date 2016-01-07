var path = require('path');
var logger = require('./logger')('renderer', 'magenta');
var $ = require('jquerygo');

module.exports = renderer;

function renderer(url, specs, callback) {
  function phantomscript() {
    // phantomjs context start //
    var snap = {};
    for (var n in window.spec) {
      var node = document.querySelector(n);
      var rules = window.spec[n];
      var computed = getComputedStyle(node);
      if (computed) {
        snap[n] = {};
        for (var i = 0; i < rules.length; i++) {
          var rule = rules[i];
          snap[n][rule] = computed[rule];
        }
      } else {
        console.warn('selector ' + n + ' didn\'t work');
      }
    }
    // phantomjs context end //
    return snap;
  }

  $.visit(url, function() {
    $.getPage(function(page) {
      $('body').append('<script type="text/javascript">window.spec = ' + JSON.stringify(specs) + '</script>', function() {
        logger('page rendered and specs injected', 'magenta');
      });
      page.evaluate(phantomscript, callback);
      $.close();
    });
  });
}
