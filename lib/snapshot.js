var fs = require('fs');
var path = require('path');
var config = require('../config');
var log = require('./logger')('snapshot', 'green');
var utils = require('./utils');

var snapshot = {
  save: function(cssBuildPath, snapshot) {
    if (typeof snapshot !== 'string') {
      snapshot = JSON.stringify(snapshot, null, 4);
    }
    var file = utils.snapshotPath(cssBuildPath);
    fs.writeFileSync(file, snapshot, 'utf-8');
    log('Snap shot: ' + file + ' created');
  }
};

module.exports = snapshot;
