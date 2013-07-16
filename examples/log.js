var toolbox = require('../index').use({config:true,force_env:'production'})




toolbox.log("Simple string")
// Returns:
// 07/16/13-10:39:25 | Simple string

toolbox.log({hi:123}) // returns:
// 07/16/13-10:39:37 | ============================== Obj =>
// { hi: 123 }
// <========================================================|

toolbox.log("String plus obj is:",{hi:123}) // Returns:
// 07/16/13-10:42:18 | ============================== Obj =>
// Note: String plus obj is:
// { hi: 123 }
// <========================================================|


var str = "String type should really be 'String'"
toolbox.log(str, toolbox.getType(str)) // Returns:
// 07/16/13-10:43:53 | ============================== Obj =>
// Note: String type should really be 'String'
// 'String'
// <========================================================|


toolbox.log('A number should be a "Number"', toolbox.getType(123))
// 07/16/13-10:44:48 | ============================== Obj =>
// Note: A number should be a "Number"
// 'Number'
// <========================================================|


var err = new Error('Error text')
toolbox.err('Optional note', err) // Returns:
// 07/16/13-10:43:53 | ============================== Obj =>
// Note: String type should really be 'String'
// 'String'
// <========================================================|

var err = 'Just a string, desc of error'
toolbox.err('Optional note', err) // Returns:
// 07/16/13-10:43:53 | ============================== Obj =>
// Note: String type should really be 'String'
// 'String'
// <========================================================|