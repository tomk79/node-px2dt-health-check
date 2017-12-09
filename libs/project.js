/**
 * px2dt-health-checker - project.js
 */
module.exports = function(path, relativePathEntryScript, relativePathHomeDir){
	var utils79 = require('utils79');
	var utils = require('./utils.js');

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
					ls: utils.ls(realpath)
				};
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				result.project.composer = {
					pathsComposerJson: [],
					pathsVendor: []
				};
				var rootDir = result.project.path.path;
				if(relativePathEntryScript){
					rootDir = utils79.dirname(require('path').resolve(rootDir, relativePathEntryScript));
				}

				try {
					var pathsComposerJson = utils.findFilesInParentPath( 'composer.json', rootDir );
					if(pathsComposerJson){
						for(var idx in pathsComposerJson){
							var vendor = {
								path: pathsComposerJson[idx],
								json: JSON.parse( require('fs').readFileSync(pathsComposerJson[idx]).toString() )
							};
							result.project.composer.pathsComposerJson.push(vendor);
						}
					}
				} catch (e) {
				}

				try {
					var pathsVendor = utils.findFilesInParentPath( 'vendor', rootDir );
					if(pathsVendor){
						for(var idx in pathsVendor){
							var vendor = {
								path: pathsVendor[idx],
								ls: utils.ls( pathsVendor[idx] )
							};
							result.project.composer.pathsVendor.push(vendor);
						}
					}
				} catch (e) {
				}
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				try {
					result.project.px2package = {
						path: result.project.composer.pathsComposerJson[0].path,
						content: result.project.composer.pathsComposerJson[0].json.extra.px2package
					};
				} catch (e) {
					result.project.px2package = undefined;
				}
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				var px2packagePrimaryProject = (function(px2package){
					if( px2package === undefined ){
						return {};
					}
					if( px2package.type == 'project' ){
						return px2package;
					}else if( px2package[0] ){
						for(var idx in px2package){
							if(px2package[idx].type == 'project'){
								return px2package[idx];
							}
						}
					}
					return {};
				})(result.project.px2package);

				var realpathEntryScript = require('path').resolve(result.project.path.path, relativePathEntryScript);
				if(!relativePathEntryScript && px2packagePrimaryProject.path){
					realpathEntryScript = require('path').resolve(result.project.path.path, px2packagePrimaryProject.path);
				}
				result.project.entryScript = {
					_inputValue: relativePathEntryScript,
					_px2packageValue: px2packagePrimaryProject.path,
					path: realpathEntryScript,
					exists: require('fs').existsSync(realpathEntryScript),
					isFile: utils79.is_file(realpathEntryScript)
				};

				var realpathHomeDir = require('path').resolve(result.project.path.path, relativePathHomeDir);
				if(!relativePathHomeDir && px2packagePrimaryProject.path_homedir){
					realpathHomeDir = require('path').resolve(result.project.path.path, px2packagePrimaryProject.path_homedir);
				}
				result.project.homeDir = {
					_inputValue: relativePathHomeDir,
					_px2packageValue: px2packagePrimaryProject.path_homedir,
					path: realpathHomeDir,
					exists: require('fs').existsSync(realpathHomeDir),
					isDir: utils79.is_dir(realpathHomeDir),
					ls: utils.ls(realpathHomeDir)
				};
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				result.project.config = {};
				try {
					if( utils79.is_file(result.project.homeDir.path+'/config.php') ){
						result.project.config.path = require('path').resolve(result.project.homeDir.path, 'config.php');
					}else if( utils79.is_file(result.project.homeDir.path+'/config.json') ){
						result.project.config.path = require('path').resolve(result.project.homeDir.path, 'config.json');
					}
					result.project.config.content = require('fs').readFileSync(result.project.config.path).toString();
				} catch (e) {
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
