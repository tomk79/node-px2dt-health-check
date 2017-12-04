var assert = require('assert');
var Px2dtHealthChecker = require('../libs/main.js');

describe('Health check', function() {

	it("Health Check", function(done) {
		this.timeout(60*1000);
		var px2dtHealthChecker = new Px2dtHealthChecker();
		px2dtHealthChecker.checkDt(__dirname+'/px2dt_data/standard/', 0, function(result){
			assert.equal(typeof(result), typeof({}));
			console.log(result);
			done();
		});
	});

});
