## doojs
simple ajax class
### Usage

Code html
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
_NB: You can run the node server in test folder for testing send and receive data_
#### Licence
MIT
