var fs = require('fs');
var utils = require('./utils');
var log = require('./logger')('comparator', 'yellow');

var comparator = {
  compare: function(validshot, newshot) {
    var result = {};
    for (var key in validshot) {
      result[key] = {};
      for (var key2 in validshot[key]) {
        result[key][key2] = {
          expected: validshot[key][key2],
          actual: newshot[key] ? newshot[key][key2] : {}
        }
        if (newshot[key] && validshot[key][key2] === newshot[key][key2]) {
          delete result[key][key2];
        }
      }
      if (Object.keys(result[key]).length === 0) {
        delete result[key];
      }
    }
    return result;
  }
};

module.exports = comparator;
