/**
 * px2dt-health-checker - utils.js
 */
module.exports = function(){
}

/**
 * ディレクトリ内のファイルとディレクトリの一覧を取得
 */
module.exports.ls = function(dir){
	var utils79 = require('utils79');
	var rtn;
	try {
		rtn = require('fs').readdirSync(dir);
		for(var idx in rtn){
			if(utils79.is_dir( dir+'/'+rtn[idx] )){
				rtn[idx] += '/';
			}
		}
	} catch (e) {
	}
	return rtn;
}

/**
 * composerのルートの絶対パスを得る
 */
module.exports.findFilesInParentPath = function(fileName, rootDir){
	var utils79 = require('utils79');
	var rtn = [];
	return (function(path){
		function checkParentDir(path){
			if( utils79.is_dir( path ) && utils79.is_file( path+'/'+fileName ) ){
				rtn.push( require('path').resolve(path, fileName) );
			}else if( utils79.is_dir( path ) && utils79.is_dir( path+'/'+fileName ) ){
				rtn.push( require('path').resolve(path, fileName)+'/' );
			}
			var nextPath = utils79.dirname( path );
			if( nextPath == path ){
				return false;
			}
			checkParentDir( nextPath );
		}
		checkParentDir(path);
		return rtn;
	})( rootDir );
}
