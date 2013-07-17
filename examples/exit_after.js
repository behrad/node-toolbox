t =  require('../index').use({conf:true, force:true})

t.beforeExit(function(done){
	console.log('this ran before exit')
	return done('hi im fin with my last function call')
})
t.beforeExit(function(done){
	setTimeout(function(){
		console.log('this ran before exit but with timeout')
	return done('hi im fin with my last function call')
	},1000)
})

t.onlyExitAfter(function(done){
	return done(true);
})


var i = 0
var need  = 10
t.onlyExitAfter(function(done){
	if (i === need) return done(true)
		i++
	return done(false);
})




setInterval(function(){
	t.log('in interval')
}, 30000)