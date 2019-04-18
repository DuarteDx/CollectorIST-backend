'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

const HEADING = 'Base6400';

function encode(text) {
	return HEADING + Buffer.from(text).toString('base64');
}

const reBase64MF = /^([a-zA-Z0-9\+\/]*={0,2})$/;
function decode(code) {
	let text = null;
	if (typeof code == 'string' 
		&& code.startsWith(HEADING) 
		&& code.length % 4 == 0 
		&& reBase64MF.test(code)) {
		text = Buffer.from(code.slice(HEADING.length), 'base64').toString('utf8');
	}
	return text;
}

module.exports = { encode, decode };