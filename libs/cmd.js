/**
 * px2dt-health-checker - cmd.js
 */
module.exports = function(){
	var utils79 = require('utils79');
	var childProc = require('child_process');

	/**
	 * Health Check を実行する
	 */
	this.check = function(callback){
		callback = callback || function(){}
		var result = {
			cmd : {}
		};

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){
				var cmd = 'php -v';
				childProc.exec(cmd, function(err, stdout, stderr) {
					result.cmd[cmd] = stdout;
					rlv();
				});
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				var cmd = 'composer --version';
				childProc.exec(cmd, function(err, stdout, stderr) {
					result.cmd[cmd] = stdout;
					rlv();
				});
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				var cmd = 'git --version';
				childProc.exec(cmd, function(err, stdout, stderr) {
					result.cmd[cmd] = stdout;
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
