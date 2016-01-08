var cs = require('..'); // that's our css-specs lib
var fs = require('fs');

var log = cs.logger('example', 'yellow');
var timer = log.timer('full run', 'magenta');

var cssBuildPath = '/home/olivier/dev/AppDirect/appdirect-parent/appdirect/target/classes/com/appdirect/wicket/resources/spa/themes/adp/styles/generated-styles.css';
var url = './example.html';

// url = 'https://testadp.appdirect.com/';
// cssBuildPath = '/home/olivier/somebuild.css';

var cssToCheck = fs.readFileSync(cssBuildPath, 'utf-8');
var rendererIsRunning = false;

if (cs.utils.snapshotExist(cssBuildPath)) {
  var compare = function() {
    log('comparing...')
    if (rendererIsRunning)
      return
    rendererIsRunning = true;
    cs.renderer(url, cssToCheck, function(result) {
      var validshot = require(cs.utils.snapshotPath(cssBuildPath));
      var diff = cs.comparator.compare(validshot, result.styles);
      cs.reporter(diff)
      timer();
      rendererIsRunning = false;
      setTimeout(compare, 2000);
    });
  }

  log('watching for ' + cssBuildPath);
  fs.watch(cssBuildPath, compare);
  compare();

} else if (!rendererIsRunning) {
  rendererIsRunning = true;
  log('snapshot does not exist, creating it...', 'red');
  cs.renderer(url, cssToCheck, function(result) {
    cs.snapshot.save(cssBuildPath, result.styles);
    log('snapshot saved, you may run it again after changes');
    timer();
    rendererIsRunning = false;
  });
}
