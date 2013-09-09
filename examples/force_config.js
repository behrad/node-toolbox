var forced_config_file = {
	host: "www.production.com:9000"
}

var toolbox = require('../index').use({
	config: true,
  force_env:"development",
	development: forced_config_file
});

console.log("Does toolbox's config [%s] === our sample [%s]? %s", toolbox.config.host, forced_config_file.host, forced_config_file.host === toolbox.config.host)