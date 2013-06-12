node-toolbox
============

Useful node tools


## Use json config files:

1. Create ./config/development.js and/or ./config/production.js in proj folder.

2. Import configs

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


