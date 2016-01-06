var Runtime = require('..').runtime;
var specs = new Runtime();

specs.template('example.html');
specs.compare('build.css', 'specs.css');
