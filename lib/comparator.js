var fs = require('fs');
var path = require('path');
var config = require('../config');
var snapshot = require('./snapshot');
var logger = require('./logger')('comparator', 'yellow');

var comparator = {
  compare: function(newshot) {
    var snapshot = JSON.parse(this.getLastSnapshot());
    if (typeof newshot === 'string')
      newshot = JSON.parse(newshot);

    var result = {};
    for (var key in snapshot) {
      result[key] = {};
      for (var key2 in snapshot[key]) {
        result[key][key2] = {
          expected: snapshot[key][key2],
          actual: newshot[key] ? newshot[key][key2] : {}
        }
        if (newshot[key] && snapshot[key][key2] === newshot[key][key2]) {
          delete result[key][key2];
        }
      }
      if (Object.keys(result[key]).length === 0) {
        delete result[key];
      }
    }
    return result;
  },

  getLastSnapshot: function() {
    var read = fs.readFileSync(snapshot.generateFileName(), 'utf-8');
    logger(read, 'yellow');
    return read;
  }
};

module.exports = comparator;
