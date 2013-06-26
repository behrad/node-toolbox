var toolbox = require('../index')

toolbox.log({hi:123})
toolbox.log("this req",{hi:123})
toolbox.log("just string")
toolbox.log("just string", "and another")
var str = "string type should really be string"
toolbox.log(str, toolbox.getType(str))
toolbox.log('a number is a ', toolbox.getType(123))
