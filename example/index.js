var cSpecs = require('..'); // that's our css-specs lib
var fs = require('fs');

var logger = require('../lib/logger')('example', 'yellow');

cSpecs.manual();

var cssToCheck = fs.readFileSync('./build.min.css', 'utf-8');
var specs = require('./specs.js');

cSpecs.renderer('http://perdu.com', cssToCheck, specs, function(result) {

  // save snapshot
  if (result.stats.stylesSize > 0) {
    cSpecs.snapshot.save(result.styles);
  } else {
    logger('Nothing to save');
  }

});
