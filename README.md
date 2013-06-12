node-toolbox
============

Useful node tools


## Use config files in "/config"

```js
var toolbox = require('../index')
toolbox.use({
	config:true,
	force_env:"production" // defaults to "development"
});

console.log(toolbox.config)

// returns -->>> 
// { mysql:
//   { host: 'mydb.myhost.com',
//     user: 'user',
//     password: 'pass',
//     database: 'test',
//     connectionLimit: 4 },
//  other: { ex_host: 'otherhost.com' } }

```


