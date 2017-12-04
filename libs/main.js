/**
 * px2dt-health-checker
 */
module.exports = function(pathDataDir, projectId){
	var utils79 = require('utils79');

	/**
	 * Health Check を実行する
	 */
	this.check = function(callback){
		callback = callback || function(){}
		var result = {};

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

		result.dataDir = {
			path: require('path').resolve(pathDataDir),
			exists: require('fs').existsSync(pathDataDir),
			isDir: utils79.is_dir(pathDataDir),
			ls: require('fs').readdirSync(pathDataDir)
		};

		result.dbJson = {
			path: require('path').resolve(pathDataDir+'/db.json'),
			exists: require('fs').existsSync(pathDataDir+'/db.json'),
			isFile: utils79.is_file(pathDataDir+'/db.json')
		};
		try {
			result.dbJson.contents = JSON.parse(require('fs').readFileSync(pathDataDir+'/db.json').toString());
		} catch (e) {
			result.dbJson.contents = false;
		}

		result.project = {
			searchProjectKey: projectId
		};
		try {
			if(result.dbJson.contents && result.dbJson.contents.projects){
				if( result.dbJson.contents.projects[projectId] ){
					result.project.index = projectId;
					result.project.id = result.dbJson.contents.projects[projectId].id;
				}else{
					for(var idx in result.dbJson.contents.projects){
						if( result.dbJson.contents.projects[idx].id == projectId ){
							result.project.index = idx;
							result.project.id = projectId;
							break;
						}
					}
				}

			}
		} catch (e) {
		}
		if( typeof(result.project.index) == typeof(0) ){
			result.project.contents = result.dbJson.contents.projects[result.project.index];
			result.project.path = {
				exists: require('fs').existsSync(result.project.contents.path),
				isDir: utils79.is_dir(result.project.contents.path)
			};
			try {
				result.project.path.ls = require('fs').readdirSync(result.project.contents.path);
			} catch (e) {
				result.project.path.ls = false;
			}
		}

		callback(result);
		return;
	}

}
