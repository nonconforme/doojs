## About
If you want use jquery ajax and you want not load jquery library. `doojs` is appropriate.
`doojs` is a simple ajax class. Implement four methods: `doo.get`, `doo.post`, `doo.getJSON`, `doo.getXML`.

### Get-Start
> include the source.

```html
	<!DOCTYPE html>
	<html>
	<body>
		<div id="response"></div>
		<script type="text/javascript" src="path/to/doo.js"></script>
	</body>
	</html>
```
```js
	var res = document.getElementById("response");
	doo.get({
		url: "url",
		type: "text/plain",
		dataType: "json",
		success: function(data) {
			res.innerHTML = data;
		},
		error: function(err) {
			console.error(err);
		}
	});
```

## Documentation

All usage of `doo` methods.

## get method

`doo.get` method take `object`. in this object.
- `url` path
- `data` additionnal data, e.g `data: name=foo&lastname=bar`
- `dataType` type for receive data. it can be `json`, `xml` or `text`.
	by default dataType = `json`
- `interval` active setInterval, default null
- `timeout` active setTimeout, default null
- `type` override mime type in xhr object
- `success` function have executed if no error, it take `data`, response.
- `error` function have executed if error, it take `error`.

## post method

`doo.post` method take `object`. in this object.
- `url` path
- `data` additionnal data, e.g `data: name=foo&lastname=bar`
- `type` override mime type in xhr object
- `success` function have executed if no error, it take `data`, response.
- `error` function have executed if error, it take `error`.

## Simple method
* getJOSN
it take two parameters `url` and `function(err, data)`.
`err` is `boolean` and `data` is `JSON.parse(responseText)`.
```js
	doo.getJSON("url-to-server-or-file", function(err, data) {
		if (err) {
			return console.error("request error");
		}
		res.innerHTML = "";
		for (var value of data) {
			res.innerHTML += value + "<br/>" ;
		}
	});
```
* getXML
likewise `getJSON`, but `data` is a `XMLDocument`

_NB: You can run the node server in test folder, for testing send and receive data_

# LICENCE
MIT Licence
Copyright (c) 2015 "Franck Dakia"

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
