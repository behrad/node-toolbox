var path = require('path');
var env = process.env.NODE_ENV || 'development';

module.exports = new Tools()

function Tools() {
	return this;
}

Tools.prototype.use = function(settings) {
	if ('object' !== typeof settings) return new Error("Must provide settings")
	if (settings.force_env) env = settings.force_env;
	if (settings.config) this.config = getConfig();
}


function getConfig() {
	var conf_file = env + ".js";
	var conf_file_path = path.dirname(module.parent.filename) + "/config/" + conf_file;
	try {
		var config_data = require(conf_file_path);
		return config_data;
	} catch (err) {
		var msg = new Error('Error: config file "' + conf_file_path + '" does not exist.');
		console.error(msg);
		console.error(err);
		console.trace();
		process.exit(1);
	}
}