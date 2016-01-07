var fs = require('fs');
var path = require('path');
var config = require('../config');
var log = require('./logger')('snapshot', 'green');

var snapshot = {
  save: function(snap) {
    var file = this.generateFileName(snap);
    fs.writeFileSync(file, snap, 'utf-8');
    log('Snap shot: ' + file + ' created');
  },

  generateFileName: function() {
    return path.join(config.snapshotPath, config.buildPath.replace(/\//g, '-') + '.json');
  }
};

module.exports = snapshot;
