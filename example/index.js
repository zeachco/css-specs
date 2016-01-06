var Runtime = require('css').runtime;

var specs = new Runtime();
specs.template('example.html');
specs.compare('build-deutsche.css', 'specs-deutsche.css');
specs.compare('build-adp.css', ['appdirect-parent/appdirect/src/main/java/com/appdirect/wicket/resources/themes/adp/test/*.spec.css']);

var specs = new Runtime();
specs.template('example2.html');
specs.compare('build-deutsche.css', 'specs-deutsche.css');
specs.compare('build-adp.css', ['appdirect-parent/appdirect/src/main/java/com/appdirect/wicket/resources/themes/adp/test/*.spec.css']);
