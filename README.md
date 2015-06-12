## doojs
simple ajax class
### Usage
<<<<<<< HEAD
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
 <script type="text/javascript" src="app.js"></script>
</body>
</html>
```
Code javascript

```js
"use strict";
var r = document.getElementById('r');

doo.get({
	url: 'app.json',
	method: "GET",
	dataType: "json",
	type: "application/json",
	timout: 500,
	interval: 200,
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
		"cel": "49929598",
		"job": "web developer"
	}
}
#### Licence
MIT
