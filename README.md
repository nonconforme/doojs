## ABOUT
If you want use jquery ajax and you want not load jquery library. doojs is appropriate.
`doojs` is a simple ajax class. Implement three methods: `doo.get`, `doo.post` and `doo.getJSON`.

### Usage
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>Test doojs</title>
</head>
<body>
 <div id="r">
 </div>
 <script type="text/javascript" src="../doo.js"></script>
</body>
</html>
```
Code javascript
---------------
#### 
```js
"use strict";
var r = document.getElementById('r');

doo.get({
	url: 'test/db.json',
	dataType: "json",
	type: "application/json",
	timout: 500,
	success: function(data) {
		r.innerHTML = "nom: " + data.name + "<br/>prenom: " + data.lastname + "<br/>mail: " + data.adress.mail;
	},
	error: function(err) {
		r.innerHTML = "code: " + err.error + "<br/>status: " + err.status;
	}
});
```
JSON data
```json
{
	"name": "Dakia",
	"lastname": "Franck",
	"adress": {
		"mail": "dakiafranckinfo@gmail.com",
		"phone": "+22549929598",
		"job": "web developer"
	}
}
```
_NB: You can run the node server in test folder, for testing send and receive data_
#### Licence
Copyright (c) 2015 "Cowboy" Franck Dakia

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
