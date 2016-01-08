var cs = require('..'); // that's our css-specs lib
var fs = require('fs');

var log = cs.logger('example', 'yellow');
var timer = log.timer('full run', 'magenta');

var cssBuildPath = 'example.css';
var url = './example.html';

// url = 'http://perdu.com/';
// cssBuildPath = '/home/zeachco/dev/css/build/style.min.css';

var cssToCheck = fs.readFileSync(cssBuildPath, 'utf-8');

if (cs.utils.snapshotExist(cssBuildPath)) {
  cs.renderer(url, cssToCheck, function(result) {
    var validshot = require(cs.utils.snapshotPath(cssBuildPath));
    var diff = cs.comparator.compare(validshot, result.styles);
    cs.reporter(diff)
    timer();
  });
} else {
  log('snapshot does not exist, creating it...', 'red');
  cs.renderer(url, cssToCheck, function(result) {
    cs.snapshot.save(cssBuildPath, result.styles);
    log('snapshot saved, you may run it again after changes');
    timer();
  });
}
