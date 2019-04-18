'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , mifo = noda.inRequire('index')
    ;

describe('urlencode', () => {

    it('encode', () => {
        let code = 'URLENCODE%20URL%20ENCODE';
        let text = 'URL ENCODE';
        assert.equal(code, mifo.urlencode.encode(text));
    });

    it('decode', () => {
        let code = 'URLENCODE%20URL%20ENCODE';
        let text = 'URL ENCODE';
        assert.equal(text, mifo.urlencode.decode(code));
    });
    
    it('smart decode', () => {
        let code = 'URLENCODE%20URL%20ENCODE';
        let text = 'URL ENCODE';
        assert.equal(text, mifo.decode(code));
    });
});