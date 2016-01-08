var cSpecs = require('..'); // that's our css-specs lib
var fs = require('fs');

var log = cSpecs.log('example', 'yellow');

var cssBuildPath = './build.min.css';
var cssToCheck = fs.readFileSync(cssBuildPath, 'utf-8');
var specs = require('./specs.js');
var url = 'http://perdu.com';

if (cSpecs.utils.snapshotExist(cssBuildPath)) {
  log('Getting current styles...');
  cSpecs.renderer(url, cssToCheck, specs, function(result) {
    var validshot = require(cSpecs.utils.snapshotPath(cssBuildPath));
    log('Comparing to last valid snapshot...');
    cSpecs.comparator.compare(validshot, result.styles, function(diff) {
      log(diff);
      if (Object.keys(diff).length) {
        logger('✔ no diff detected', 'green');
      } else {
        logger('✗ build doesn\'t match!', 'red');
        logger(diff, 'red');
      }
    });
  });
} else {
  log('snapshot does not exist, creating it...', 'red');
  cSpecs.renderer(url, cssToCheck, specs, function(result) {
    if (result.stats.stylesSize > 0) {
      cSpecs.snapshot.save(cssBuildPath, result.styles);
      log('snapshot saved, you may run it again after changes');
    } else {
      log('Nothing to save');
    }
  });
}
