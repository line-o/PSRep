var literals = ['boolean', 'string', 'number', 'object']

function extractConstructorName (o) {
	var s = o.constructor.toString()
	return s.substring(9, s.indexOf('(')) //'function '...'('
}

function isArrayOf (type, array) {
	var reduce, test
		constructorMatch = extractConstructorName(type)
	//currying
	if (array == undefined)
		return function (a) { return isArrayOf(type, a) }
    //compile testing functions
	function testLiteral (o) {
		return (typeof o == type)}
	function testPrototype (o) { 
		//TODO try to hand over function reference and use instanceOf instead
		return (extractConstructorName(o) == constructorMatch)}
	//choose testing function and run test
	test = (literals.indexOf(type) >= 0) ? testLiteral : testPrototype
	return array.reduce(function (prev, curr) {
		return (prev & test(curr))}, true)
}

TypeUtils = {
	getConstructor : extractConstructorName,
	isArrayOf      : isArrayOf,
	isArrayOfStrings : isArrayOf('string'),
	LITERALS : literals
};

module.exports = TypeUtils;