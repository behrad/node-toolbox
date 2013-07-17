var path = require('path');
var env = process.env.NODE_ENV || 'development';
var moment = require('moment');
var util = require('util');
var force_exit = false;
module.exports = tools = new Tools()
var before_exit_store = [];
var before_exit_ops_no = 0
var before_exit_completed = [];
var exit_after_store = [];
var exit_after_completed = [];

function Tools() {
	return this;
}

Tools.prototype.use = function(settings) {
	if ('object' !== typeof settings) throw new Error("Must provide settings")
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


Tools.prototype.onlyExitAfter = function(item) {
	exit_after_store.push(item)

	if (this.watchingTerm === undefined) this.watchTerm();
}




Tools.prototype.beforeExit = function(fn_op) {
	console.log('before exit is run')
	before_exit_store.push(fn_op)
	before_exit_ops_no = before_exit_store.length;
	if (this.watchingTerm === undefined) this.watchTerm();
}

Tools.prototype.watchTerm = function() {
	this.watchingTerm = true;
	var self = this;
	console.log('starting to watch term')
	process.on('SIGTERM', self.forceExit); // force kill
	process.on('SIGINT', self.startExit); // graceful kill
}


Tools.prototype.forceExit = function() {
	before_exit_completed =[];
	if (before_exit_store.length ===0 ) return setTimeout(function(){process.exit()}, 500) 
	before_exit_store.forEach(function(to_do_fn) {
		to_do_fn(function(res) {
			before_exit_completed.push(res)
			tools.log('before_exit_done vs total', [before_exit_completed.length, before_exit_ops_no])
			if (before_exit_completed.length === before_exit_ops_no) {
				tools.log('force exit is forcing exit', before_exit_completed)
				return setTimeout(function(){process.exit()}, 500) 
			}
		})
	})
}



Tools.prototype.startExit =  function() { 
	if (force_exit === true || exit_after_store.length === 0) return tools.forceExit();
	force_exit = true;
	var intvl = setInterval(function() {
		tools.log('inside interval')
		var done = 0
		exit_after_store.forEach(function(fn_to_check) {
			fn_to_check(function(status) {
				if (status === true) done++
					tools.log('fn check got', status)
				if (done === exit_after_store.length) {
					console.log('done is all done')
					clearInterval(intvl)
					return tools.forceExit();
				}
			})
		})
	}, 1000)
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