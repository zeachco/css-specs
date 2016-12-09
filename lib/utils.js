var fs = require('fs');
var path = require('path');
var config = require('../config');

function snapshotFilename(snapPath) {
  return snapPath.replace(/[^[a-zA-Z0-9]+/g, '_').substr(-100) + '_snapshot.json';
}

function snapshotPath(snapPath) {
  return path.join(process.cwd(), config.snapshotPath, snapshotFilename(snapPath));
}

function snapshotExist(snapPath) {
  return fs.existsSync(snapshotPath(snapPath));
}

module.exports = {
  snapshotFilename: snapshotFilename,
  snapshotPath: snapshotPath,
  snapshotExist: snapshotExist
};