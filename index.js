var path = require('path');
var env = process.env.NODE_ENV || 'development';
var moment = require('moment');
var util = require('util');

module.exports = new Tools()

function Tools() {
	return this;
}

Tools.prototype.use = function(settings) {
	if ('object' !== typeof settings) return new Error("Must provide settings")
	if (settings.force_env) env = settings.force_env;
	if (settings.config) this.config = getConfig();
	return this
}

Tools.prototype.log = function(string, obj) {
	var pretty_colors = false;
	if (env === 'development') pretty_colors = true;
	var now = moment().format('MM/DD/YY-HH:mm:ss')
	if (('object' === typeof string) && !obj) {
		console.log(now + ' | ============================== Obj =>')
		console.log(util.inspect(string, {
			depth: null,
			colors: pretty_colors
		}))
		console.log('<========================================================|')
	} else if (('string' === typeof string) && ('undefined' !== typeof obj)) {
		console.log(now + ' | ============================== Obj =>')
		console.log('Note: ' + string)
		console.log(util.inspect(obj, {
			depth: null,
			colors: pretty_colors
		}))
		console.log('<========================================================|')
	} else {
		console.log(now + ' | ' + string)
	}
}

Tools.prototype.err = function(string, obj) {
	var pretty_colors = false;
	if (env === 'development') pretty_colors = true;
	var now = moment().format('MM/DD/YY-HH:mm:ss')
	if (('object' === typeof string) && !obj) {
		console.error(now + ' ERROR: | ============================== Obj =>')
		console.error(util.inspect(string, {
			depth: null,
			colors: pretty_colors
		}))
		console.error(string.stack)
		console.error('<========================================================|')
	} else if (('string' === typeof string) && ('undefined' !== typeof obj)) {
		console.error(now + ' | ============================== Obj =>')
		console.error('ERROR: ' + string)
		console.error(util.inspect(obj, {
			depth: null,
			colors: pretty_colors
		}))
		console.error(obj.stack)
		console.error('<========================================================|')
	} else {
		console.error(now + ' ERROR: | ' + string)
		console.stack()
	}

}


Tools.prototype.getType = function(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
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