//all element abbreviations
var abbrevs = [
'H','He','K','Li','Be','B','C','N','O','F','Ne','L','Na','Mg','Al','Si','P','S','Cl','Ar','M','K','Ca','Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','N','Rb','Sr','Y','Zr','Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','O','Cs','Ba','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg','Tl','Pb','Bi','Po','At','Rn','P','Fr','Ra','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Uut','Uuq','Uup','Uuh','Uus','Uuo','Q','La','Ce','Pr','Nd','Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm','Md','No','Lr'
];
function matchesRep (str, el) {
	//console.log(str, el, str.indexOf(el));
	return (str.indexOf(el.toLowerCase()) === 0);
}

var ChemElemRep = {};

function build (str, rep) {
	var i, el;
	if (str.length === 0)
		return rep;
	res = [];
	for (i = abbrevs.length; i -= 1;) {
		el = abbrevs[i];
		if (matchesRep(str, el)) {
		console.log(el);
			res.push(build(str.slice(el.length), rep.concat([el])));
		}
	}
	return res;
};
ChemElemRep.getRep = function (str) {
	var idx = 0, 
		idxs = [],
		representation = [],
		cs = str.split(''),
		cnt = cs.length;
	if (cnt === 0) {
		console.log('empty string');
		return false;
	}
	else
		console.log(str);
	return build(str, [], []);
};
module.exports = ChemElemRep;