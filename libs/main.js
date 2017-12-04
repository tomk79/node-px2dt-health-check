/**
 * px2dt-health-checker
 */
module.exports = function(){
	var utils79 = require('utils79');
	var Cmd = require('./cmd.js'),
		cmd = new Cmd();

	/**
	 * Health Check を実行する
	 */
	this.checkDt = function(pathDataDir, projectId, callback){
		callback = callback || function(){}
		var result = {};

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){
				var Platform = require('./platform.js'),
					platform = new Platform();
				platform.check(function(tmpRslt){
					result = Object.assign(result, tmpRslt);
					rlv();
				});
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				var Cmd = require('./cmd.js'),
					cmd = new Cmd();
				cmd.check(function(tmpRslt){
					result = Object.assign(result, tmpRslt);
					rlv();
				});
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				var Dt = require('./dt.js'),
					dt = new Dt(pathDataDir, projectId);
				dt.check(function(tmpRslt){
					result = Object.assign(result, tmpRslt);
					rlv();
				});
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				callback(result);
			}); })
		;


		return;
	}

}
