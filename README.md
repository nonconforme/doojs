## doojs
simple ajax class
### Usage
#### get
- get takes 2 paramters, `url` and `callback`
	```js
		"use strict"
		doo.get(url, cb);
	```
	the `callback` takes 2 parameters, `error` and `response`, `response` is a javascript object

#### post
- post takes 2 parameters, `url`, `formData` and `callback`
	```js

		"use strick";

		var url, formData;
		
		doo.post(url, formData, cb);

	```
	the `callback` takes 1 parameter, `error`.

- you can chained
	```js
	
		"use strict"
		
		var url, formData, otherFormData, cb;

		doo.post(url, formData, cb).post(url, otherFormData, cb);
		
		// or
		
		doo.get(url, cb).post(url, formData, cb);
	
	```

#### timeout and timeinterval
- timeout and timeinterval takes 2 parameters, `cb` and `timeout` in ms.
- timeout :
	```js
		"use strict"
		var cb, ms;
		doo.timeout(cb, ms);
	```
- timeinterval :
	```js
		"use strict"
		var cb, ms;
		doo.timeinterval(cb, ms);
	```

##### e.g
```js
	// with get
	"use strict";

 	doo
 	.get('/posts', function(err, res) {
    	
    	if(err !== null) {
    	
    		return console.log("Ok ):");
    	
    	}

    	return console.error("Oops :(");
 	
 	})
 	.get("/articles/5", function(err, res) {

 		if(err !== null) {

 			console.log("ok ):");
 		
 		}

 	});
```
---
### Usage exemple with `post`
```html
	<!Doctype HTML>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>Doojs - testing</title>
		</head>
		<body>
			<div id="res">
			</div>
			<form action="post" action="" id="form">
				<input type="text" name="name" placeholder="Your name"/>
				<input type="submit" value="Add"/>
			</form>
			<script type="text/javascript" src="doojs/doo.js"></script>
			<script type="text/javascript">
				
				"use strict";

				(function(){

					var form = document.getElementById("form");
					
					form.addEventListener("submit", function(event) {
					
						var data = {};
						var inputs = document.getElementsByTagName("input");
						var len = inputs.length;
						
						for(var i = 0; i < len; i++) {

							if(inputs.item(i).type === "text") {

								data[inputs.item(i).name] = inputs.item(i).value;
								
							}

						}

						doo.post("posts/add", data, function(err) {

							if(err !== null)
							{
								return console.log("Ok ):");
							}

							throw new Error("Error :(");

						});
				
						event.preventDefault();
					
					}, false);
				
				})();

			</script>
		</body>
	</html>
```
#### Licence
MIT
