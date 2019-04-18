'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    ;

const formats =  noda.inRequireDir('format');

function decode(code) {
    let text = null;
    for (let name in formats) {
        text = formats[name].decode(code);
        if (text != null) break;
    }
    return text;
}

module.exports = Object.assign({ decode }, formats);