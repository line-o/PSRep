var ps = require('./PS'),
	tests = ['p', 'pb', 'pbr', 'asd', 'punk', 'j', 'y', 'i']

tests.map(function (e){
	console.log('normal',e,ps.getRep(e,false))
	console.log('extended',e,ps.getRep(e,true))
})
