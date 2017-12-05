/**
 * px2dt-health-checker - dt.js
 */
module.exports = function(pathDataDir, projectId){
	var utils79 = require('utils79');

	/**
	 * Health Check を実行する
	 */
	this.check = function(callback){
		callback = callback || function(){}
		var result = {};

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){

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

				result.dtProjectInfo = {
					_searchProjectKey: projectId
				};
				try {
					if(result.dbJson.contents && result.dbJson.contents.projects){
						if( result.dbJson.contents.projects[projectId] ){
							result.dtProjectInfo.index = projectId;
							result.dtProjectInfo.id = result.dbJson.contents.projects[projectId].id;
						}else{
							for(var idx in result.dbJson.contents.projects){
								if( result.dbJson.contents.projects[idx].id == projectId ){
									result.dtProjectInfo.index = idx;
									result.dtProjectInfo.id = projectId;
									break;
								}
							}
						}

					}
				} catch (e) {
				}
				if( typeof(result.dtProjectInfo.index) == typeof(0) ){
					result.dtProjectInfo.contents = result.dbJson.contents.projects[result.dtProjectInfo.index];
					result.dtProjectInfo.path = {
						exists: require('fs').existsSync(result.dtProjectInfo.contents.path),
						isDir: utils79.is_dir(result.dtProjectInfo.contents.path)
					};
					try {
						result.dtProjectInfo.path.ls = require('fs').readdirSync(result.dtProjectInfo.contents.path);
					} catch (e) {
						result.dtProjectInfo.path.ls = false;
					}
				}

				callback(result);
			}); })
		;

		return;
	}

}
