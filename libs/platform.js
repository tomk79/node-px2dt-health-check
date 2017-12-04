/**
 * px2dt-health-checker - platform.js
 */
module.exports = function(){
	var utils79 = require('utils79');
	var childProc = require('child_process');

	/**
	 * Health Check を実行する
	 */
	this.check = function(callback){
		callback = callback || function(){}
		var result = {};

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){
				result.process = {
					platform: process.platform,
					versions: process.versions,
					arch: process.arch,
					env: {
						npm_package_name: process.env.npm_package_name,
						npm_package_version: process.env.npm_package_version
					}
				}

				result.currentDir = {
					path: require('path').resolve('.'),
					ls: require('fs').readdirSync('.')
				};

				callback(result);
			}); })
		;

		return;
	}

}
