var assert = require('assert');
var Px2dtHealthChecker = require('../libs/main.js');

describe('Health Check', function() {

	it("(準備)", function(done) {
		this.timeout(60*1000);
		var pathJson = __dirname+'/px2dt_data/standard/db.json';
		var json = require('fs').readFileSync( pathJson ).toString();
		require('fs').renameSync( pathJson, pathJson+'.orig' );
		json = json.replace(/\<tests_root\>/g, __dirname);
		require('fs').writeFileSync( pathJson, json );
		done();
	});

	it("Health Check", function(done) {
		this.timeout(60*1000);
		var px2dtHealthChecker = new Px2dtHealthChecker();
		px2dtHealthChecker.checkDt(__dirname+'/px2dt_data/standard/', 0, function(result){
			assert.equal(typeof(result), typeof({}));
			console.log(result);
			done();
		});
	});

	it("(clearning)", function(done) {
		this.timeout(60*1000);
		var pathJson = __dirname+'/px2dt_data/standard/db.json';
		require('fs').renameSync( pathJson+'.orig', pathJson );
		done();
	});

});
