var cs = require('..'); // that's our css-specs lib
var fs = require('fs');

var log = cs.logger('example', 'yellow');

var cssBuildPath = './build.min.css';
var url = './template.html';
var specs = require('./specs.js');

var cssToCheck = fs.readFileSync(cssBuildPath, 'utf-8');
if (cs.utils.snapshotExist(cssBuildPath)) {
  log('Getting current styles...');
  cs.renderer(url, cssToCheck, specs, function(result) {
    var validshot = require(cs.utils.snapshotPath(cssBuildPath));
    log('Comparing to last valid snapshot...');
    var diff = cs.comparator.compare(validshot, result.styles)
    cs.reporter(diff)
  });
} else {
  log('snapshot does not exist, creating it...', 'red');
  cs.renderer(url, cssToCheck, specs, function(result) {
    if (result.stats.stylesSize > 0) {
      cs.snapshot.save(cssBuildPath, result.styles);
      log('snapshot saved, you may run it again after changes');
    } else {
      log('Nothing to save');
    }
  });
}
