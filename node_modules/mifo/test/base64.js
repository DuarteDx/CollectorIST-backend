'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , mifo = noda.inRequire('index')
    ;

describe('base64', () => {

    it('encode', () => {
        let code = 'Base64006Z2S6Z2S5a2Q6KG/';
        let text = '青青子衿';
        assert.equal(code, mifo.base64.encode(text));
    });

    it('decode', () => {
        let code = 'Base6400YmFzZTY0';
        let text = 'base64';
        assert.equal(text, mifo.base64.decode(code));
    });

    it('smart decode', () => {
        let code = 'Base6400YmFzZTY0';
        let text = 'base64';
        assert.equal(text, mifo.decode(code));
    });
    
});