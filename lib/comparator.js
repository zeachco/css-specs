var fs = require('fs');
var path = require('path');
var config = require('../config');
var snapshot = require('./snapshot');


//var old = '{"h1":{"border-radius":"2px","font-size":"10px"},"h2":{"border-radius":"0px","font-size":"12px"}}';

//var now = '{"h1":{"border-radius":"1px","font-size":"10px"},"h2":{"border-radius":"0px","font-size":"22px"}}';

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
          actual: newshot[key][key2]
        }
        if (snapshot[key][key2] === newshot[key][key2]) {
          delete result[key][key2];
          // result[key][key2].diff = true;
        }
      }
      if (Object.keys(result[key]).length === 0) {
        delete result[key];
      }
    }
    return result;
  },

  getLastSnapshot: function() {
    return fs.readFileSync(snapshot.generateFileName(), 'utf-8');
  }
};

//comparator.getLastSnapshot();

module.exports = comparator;
