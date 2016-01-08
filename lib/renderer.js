var path = require('path');
var log = require('./logger')('renderer', 'red');
var $ = require('jquerygo');
var server = require('./server');

module.exports = function renderer(url, css, callback) {
  var pageTimer = log.timer('pageload');

  // if it's local, start a server to serve the file
  if (url.indexOf('http') == -1) {
    url = server.serve(url);
  }

  // visit page
  $.visit(url, function() {
    $.getPage(function(page) {
      pageTimer();
      var styleTimer = log.timer('styles computing');
      $('head').append('<style>' + css + '</style>', function() {
        setTimeout(function() {
          page.evaluate(phantomJsSandbox, function(result) {
            if (result) {
              callback(result);
            } else {
              log('Unable to get snapshot for computed styles');
            }
            styleTimer();
            server.stop();
            $.close();
          });
        }, 0);
      });
    });
  });
}

function phantomJsSandbox() {
  var getSelector = function(el) {
    if (!(el && el.nodeName))
      return null;
    var elemName = el.nodeName.toLowerCase();
    if (el.id)
      elemName += '#' + el.id;
    if (el.className)
      elemName += '.' + el.className.replace(/ +/g, '.');
    return elemName;
  };

  var styles = {};
  var ignoredSelectors = [];
  var iterations = 0;

  var nodes = document.body.querySelectorAll('*')
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var selector = getSelector(node);
    if (!selector || selector === 'script')
      continue;

    var c = getComputedStyle(node);
    for (var ii = 0; ii < c.length; ii++) {
      var rule = c[ii];
      if (rule.indexOf('-webkit-') !== -1)
        continue;
      styles[selector] = styles[selector] || {};
      styles[selector][rule] = c[rule];
      iterations++
    }
  }
  return { // what phantomJsSandbox will return to node
    // html: html,
    styles: styles,
    ignoredSelectors: ignoredSelectors,
    stats: {
      iterations: iterations,
      // htmlSize: html.length,
      stylesSize: Object.keys(styles).length,
      ignoredSelectors: ignoredSelectors.length
    }
  };
}
