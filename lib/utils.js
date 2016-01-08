var fs = require('fs');
var path = require('path');
var config = require('../config');
var log = require('./logger');

function snapshotFilename(snapPath) {
  return snapPath.replace(/[^[a-zA-Z0-9]+/, '') + '_snapshot.json';
}

function snapshotPath(snapPath) {
  var p = path.join(process.cwd(), config.snapshotPath, snapshotFilename(snapPath))
  log(p, 'red');
  return p;
}

function snapshotExist(snapPath) {
  return fs.existsSync(snapshotPath(snapPath));
}

module.exports = {
  snapshotFilename: snapshotFilename,
  snapshotPath: snapshotPath,
  snapshotExist: snapshotExist
};
