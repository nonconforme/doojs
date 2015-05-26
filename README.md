## doojs
simple ajax class
### Usage
#### - get
- get takes 2 paramters, `url` and `callback`
	```js

		"use strict"
		doo.get(url, cb);
	
	```
	the `callback` takes 2 parameters, `error` and `response`, `response` is a javascript object

#### - post
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
#### Licence
MIT
