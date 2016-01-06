var fs = require('fs');
var path = require('path');
var config = require('../config');


//var old = '{"h1":{"border-radius":"2px","font-size":"10px"},"h2":{"border-radius":"0px","font-size":"12px"}}';

//var now = '{"h1":{"border-radius":"1px","font-size":"10px"},"h2":{"border-radius":"0px","font-size":"22px"}}';

var comparator = {
	compare: function(newshot) {
		var snapshot = this.getLastSnapshot();
		var newSnapShot = JSON.parse(newshot);

		var result = {};
		for (var key in snapshot) {
			result[key] = {};
			for (var key2 in snapshot[key]) {
				result[key][key2] = {expected: snapshot[key][key2], actual: newSnapShot[key][key2]}
				if (snapshot[key][key2] !== newSnapShot[key][key2]) {
					result[key][key2].diff = true;
				}
			}
		}
		return result;
	},

	getLastSnapshot: function() {
		var dest = path.join(config.specsPath, '/snapshots');
		var snapshots = fs.readdirSync(dest).sort(function(f1, f2) {
			return fs.statSync(path.join(dest, f1)).mtime.getTime() < fs.statSync(path.join(dest, f2)).mtime.getTime();
		});
		//console.log(snapshots);
		return fs.readFileSync(path.join(dest, snapshots[0]), 'utf-8');
	}
};

//comparator.getLastSnapshot();

module.exports = comparator;
