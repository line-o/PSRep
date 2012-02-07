var TU = require('./TypeUtils'),
    elements = "AcAgAlAmArAsAtAuBBaBeBhBiBkBrCCaCdCeCfClCmCnCoCrCsCuDbDsDyErEsEuFFeFmFrGaGdGeHHeHfHgHoHsIInIrKKrLLaLiLrLuMMdMgMnMoMtNNaNbNdNeNiNoNpOOsPPaPbPdPmPoPrPtPuQRaRbReRfRgRhRnRuSSbScSeSgSiSmSnSrTaTbTcTeThTiTlTmUUuhUuoUupUuqUusUutVWXeYYbZnZr"
    RNG_MIN = 65, //'A'
    RNG_MAX = 90, //'Z'
    abbrevs = [],
    hashes = new Object(null)
    name = process.argv[2]

function matcher(a) {
    var s=a.toLowerCase()
    return function(b) {
        //console.log('match:', s, 'with', b)
        return !s.indexOf(b.toLowerCase()) }}

function isEmptyArray(a) {
    return ((a instanceof Array) && a.length == 0)
}

//in  : [[],[[c1]],[c1],[c2],[[c2]],...,[cn]]
//out : {[c1],[c2],...,[cn]}
function flatten(a, combis) {
    var isAofSs = TU.isArrayOfStrings,
        isAofAs = TU.isArrayOf(new Array())
    //überspringe alles, ausser Arrays mit Elementen
    if (a instanceof Array && a.length > 0) {
        if (isAofSs(a) && !combis[a.join('')]) {
            combis[a.join('')] = a
        }
        else if (isAofAs(a)) {
            combis = a.reduce(function (c,el) { return flatten(el,c)},combis)
        }
    }
    return combis
}

function searchArr(els, str, finds) {
    var  recCall = function (match) {
        return searchArr(els, str.slice(match.length), finds.concat([match]))}
    if (str=="" || str==null) return finds
    return els.filter(matcher(str)).map(recCall)
}

function searchHash(elsHash, str, finds) {
    var  recCall = function (match) {
        return searchHash(elsHash, str.slice(match.length), finds.concat([match]))}
    if (str=="" || str==null) return finds
    return elsHash.filter(matcher(str)).map(recCall)
}

//internal
function createListFrom(str, map) {
    var list = [], // new Object(null),
        pointer = 0,
        abbrev = '',
        len = str.length,
        isCap = function (c) { return (RNG_MIN >= c || c <= RNG_MAX) },
        nullFunc = function (a) {return a},
        mapFunc = map || nullFunc 

    while (len > pointer) {
        abbrev += str.charAt(pointer)
        if (isCap(str.charCodeAt(++pointer))) {
            list.push(mapFunc.call(null,abbrev)) // = true; 
            abbrev = ''}}
            
    return list}

//internal
function createHashFrom(list, extend) {
    var curr,
        hash = {
            filter : function (func) {
                var ret = [], map = this.map_
                for (x in map)
                    if (func.call(null,x))
                        ret.push(map[x])
                return ret 
            },
            add: function (k,v) { this.map_[k] = v },
            get: function (k) { return this.map_[k] },
            map_: new Object(null)
        },
        extFunc = extend || function (a) {return a} 
    
    list.map(function (el){
        hash.add(el, el)
        hash = extFunc(hash, el)
    })
    
    return hash}

function addPhon(ehash) {
    return function (hash, el) {
        if (ehash[el])
            for (var i = ehash[el].length - 1; i >= 0; i--)
                hash.add(ehash[el][i], el)
        return hash
    }
}

abbrevs = createListFrom(elements)//, String.prototype.toLowerCase)
matchHash = createHashFrom(abbrevs,addPhon({'I':['J','Ie','Ih']}))

//exports    
exports.getRep = function(str, ext) {
    return (ext
        ? flatten(searchHash(matchHash, str, []), new Object(null))
        : flatten(searchArr(abbrevs, str, []), new Object(null)))
}
exports.getElementsWith = function(str) {
    var filterFunc = function (el) {
        return (el.indexOf(str) >= 0)}
    return abbrevs.filter(filterFunc)}

//called directly
if (!name || name == '') {
    console.log(matchHash)}
else {
    console.log(exports.getRep(name,false))
    console.log(exports.getRep(name,true))
}
