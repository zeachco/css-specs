var page = new WebPage();
var system = require('system');
var address = system.args[1];

if (address) {
  page.open(address, function(status) {
    console.log(status);
    if (status === 'success') {
      console.log(address);
      page.evaluate(function() {
        console.log('test');
        window.onload = function() {
          console.log('loaded!');
        };
        window.location.href = '/__log?test=3';
        var a = document.body.innerHTML + '---';
        console.log(a);
      })
      setTimeout(function() {
        phantom.exit()
      }, 0);
    } else {
      console.log('could not load page ' + address);
      phantom.exit();
    }
  });
} else {
  console.log('need an address');
  phantom.exit();
}
