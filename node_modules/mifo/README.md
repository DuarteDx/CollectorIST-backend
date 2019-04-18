#	mifo
__Micro formats encoder and decoder.__

[![total downloads of mifo](https://img.shields.io/npm/dt/mifo.svg)](https://www.npmjs.com/package/mifo)
[![mifo's License](https://img.shields.io/npm/l/mifo.svg)](https://www.npmjs.com/package/mifo)
[![latest version of mifo](https://img.shields.io/npm/v/mifo.svg)](https://www.npmjs.com/package/mifo)

>	If links in this document not avaiable, please access [README on GitHub](https://github.com/YounGoat/ecmascript.mifo/blob/master/README.md) directly.

##  Description

In this package, we defined some self-describing text formats.

##	Table of Contents

* [Get Started](#get-started)
* [API](#api)
* [Micro Formats](#micro-formats)
	* [base64](#base64)
	* [urlencode](#urlencode)
* [Links](#links)

##	Get Started

```javascript
const mifo = require('mifo');

// Encode the string into base64 format with self-describing heading.
mifo.base64.encode('青青子衿');
// RETURN: Base64006Z2S6Z2S5a2Q6KG
¡ 
mifo.base64.decode('Base64006Z2S6Z2S5a2Q6KG');
// RETURN: 青青子衿
```

##  API

*   string | null __mifo.decode__(string *code*)  
    Automatically judge the micro-format of *code* and decode it with corresponding method.

__mifo__ offers two methods for each micro format:
*   string __mifo.\<formatName\>.encode__(string *text*)
*   string | null __mifo.\<formatName\>.decode__(string *code*)

##	Micro Formats

### base64

*   string __mifo.base64.encode__(string *text*)
*   string | null __mifo.base64.decode__(string *code*)

### urlencode

*   string __mifo.urlencode.encode__(string *text*)
*   string | null __mifo.urlencode.decode__(string *code*)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/ecmascript.mifo)
