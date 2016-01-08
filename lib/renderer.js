var path = require('path');
var log = require('./logger')('renderer', 'magenta');
var $ = require('jquerygo');
var server = require('./server');

module.exports = function renderer(url, css, specs, callback) {
  var pageTimer = log.timer('pageload');
  if (typeof specs !== 'string') {
    specs = JSON.stringify(specs);
  }
  var styleAndSpecs = '<style>' + css + '</style>' +
    '<script>window.__cssSpec = ' + specs + ';</script>';

  if (url.indexOf('http') == -1) {
    url = server.start(url);
  }

  $.visit(url, function() {
    $.getPage(function(page) {
      log('Page rendered');
      pageTimer();
      var styleTimer = log.timer('styles computing');
      $('head').append(styleAndSpecs, function() {
        log('Style and specs injected');
        page.evaluate(phantomJsSandbox, function(result) {
          callback(result);
          $.close();
          styleTimer();
          server.stop();
        });
      });
    });
  });
}

function phantomJsSandbox() {
  var styles = {};
  var ignoredSelectors = [];
  var html = window.document.body.outerHTML;
  var specs = window.__cssSpec;
  for (var n in specs) {
    var node = $(n)[0];
    var cssRules = specs[n];
    var computed = getComputedStyle(node);
    if (computed) {
      styles[n] = {};
      for (var i = 0; i < cssRules.length; i++) {
        var rule = cssRules[i];
        styles[n][rule] = computed[rule];
      }
    } else {
      ignoredSelectors.push(n);
    }
  }
  return { // what phantomJsSandbox will return to node
    html: html,
    styles: styles,
    ignoredSelectors: ignoredSelectors,
    stats: {
      htmlSize: html.length,
      stylesSize: Object.keys(styles).length,
      ignoredSelectors: ignoredSelectors.length
    }
  };
}
