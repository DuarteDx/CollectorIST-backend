'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

const HEADING = 'URLENCODE%20';

function encode(text) {
	return HEADING + encodeURI(text);
}

function decode(code) {
	let text = null;
	if (typeof code == 'string' && code.startsWith(HEADING)) {
		try {
			text = decodeURI(code.slice(HEADING.length));
		}
		catch(ex) {
			/* DO NOTHING */
		}
	}
	return text;
}

module.exports = { encode, decode };