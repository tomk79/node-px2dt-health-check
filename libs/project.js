/**
 * px2dt-health-checker - project.js
 */
module.exports = function(path, relativePathEntryScript, relativePathHomeDir){
	var utils79 = require('utils79');

	/**
	 * Health Check を実行する
	 */
	this.check = function(callback){
		callback = callback || function(){}
		var result = {};
		result.project = {};

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){
				var realpath = require('path').resolve(path);
				result.project.path = {
					_inputValue: path,
					path: realpath,
					exists: require('fs').existsSync(realpath),
					isDir: utils79.is_dir(realpath),
					ls: require('fs').readdirSync(realpath)
				};

				var realpathEntryScript = require('path').resolve(result.project.path.path, relativePathEntryScript);
				result.project.entryScript = {
					_inputValue: relativePathEntryScript,
					path: realpathEntryScript,
					exists: require('fs').existsSync(realpathEntryScript),
					isFile: utils79.is_file(realpathEntryScript)
				};

				var realpathHomeDir = require('path').resolve(result.project.path.path, relativePathHomeDir);
				result.project.homeDir = {
					_inputValue: relativePathHomeDir,
					path: realpathHomeDir,
					exists: require('fs').existsSync(realpathHomeDir),
					isDir: utils79.is_dir(realpathHomeDir),
					ls: require('fs').readdirSync(realpathHomeDir)
				};
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				callback(result);
			}); })
		;

		return;
	}

}
