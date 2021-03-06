/**
 * px2dt-health-checker - platform.js
 */
module.exports = function(){
	var utils79 = require('utils79');
	var utils = require('./utils.js');

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

				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				result.currentDir = {
					path: require('path').resolve('.'),
					ls: utils.ls('.'),
					packageJson: undefined,
					composerJson: undefined
				};
				if( utils79.is_file('./package.json') ){
					try {
						result.currentDir.packageJson = JSON.parse( require('fs').readFileSync('./package.json').toString() );
					} catch (e) {
						result.currentDir.packageJson = undefined;
					}
				}
				if( utils79.is_file('./composer.json') ){
					try {
						result.currentDir.composerJson = JSON.parse( require('fs').readFileSync('./composer.json').toString() );
					} catch (e) {
						result.currentDir.composerJson = undefined;
					}
				}

				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				callback(result);
			}); })
		;

		return;
	}

}
