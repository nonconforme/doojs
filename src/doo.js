/**
* ====================================================================================
.----------------.  .----------------.  .----------------.  .----------------.
| .--------------. || .--------------. || .--------------. || .--------------. |
| |      __      | || |  _________   | || |     ____     | || | ____    ____ | |
| |     /  \     | || | |  _   _  |  | || |   .'    `.   | || ||_   \  /   _|| |
| |    / /\ \    | || | |_/ | | \_|  | || |  /  .--.  \  | || |  |   \/   |  | |
| |   / ____ \   | || |     | |      | || |  | |    | |  | || |  | |\  /| |  | |
| | _/ /    \ \_ | || |    _| |_     | || |  \  `--'  /  | || | _| |_\/_| |_ | |
| ||____|  |____|| || |   |_____|    | || |   `.____.'   | || ||_____||_____|| |
| |              | || |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' |
'----------------'  '----------------'  '----------------'  '----------------'
* doo v0.1.3
* [ATOM & CODING]
* If you want use jquery ajax and you wan't load jquery library. doojs is appropriate.
* doojs is simple ajax class.
*
* Create and maintener by Franck Dakia and diagnostic develper.
*
* @author Franck Dakia
* @author Etchien Boa
* github: http://github.com/papac/doojs
* email: dakiafranckinfo@gmail.com
* ====================================================================================
*/

;(function(){

"use strict";

/**
* @private sendGet, sendPost, sendJSONorXML, xhr
* There are private function
*/
var xhr = function () {
	return "XMLHttpRequest" in window ? new XMLHttpRequest()
   : new ActiveXObejct("Microsoft.XML");
};
var  Doo = (function () {

	// make recusive sended request.
	var next = function (fn, options, ms) {
		fn(options);
		setTimeout(next, ms, fn, options, ms);
	};

	// Alert message collection
	var message = {
		cast: "received data have not been typecast to object.",
		dataNoSend: "You make a post without sending data...",
		timeError: "timeout interval properties should not be set at the same time",
		isJSON: "File isn't JSON.",
		isXML: "File isn't XML."
	};

	//
	var sendGet = function(options) {

		var _xhr = xhr();

		if (typeof options.timeout !== "undefined" && typeof options.timeout === "number") {
			_xhr.timout = options.timeout;
		}

		var data = "";

		if (typeof options.data !== "undefined") {

			if (!/\?$/.test(options.host)) {
				data = "?";
			}

			data += encodeURIComponent(options.data);

		}

		_xhr.open("GET", options.url + data);

		if (typeof options.credential !== "undefined") {
			_xhr.withCredentials = true;
		}
		/*
			If you have defined type, system go to override mime type and request["content-type"].
		*/
		if (typeof options.type !== "undefined") {

			_xhr.overrideMimeType(options.type);
			_xhr.setRequestHeader("Content-Type", options.type);

		}

		_xhr.addEventListener("load", function () {

			if (this.readyState === this.DONE &&  this.status === 200) {

				// Response data.
				var data;

				try {

					// Construction of xml|json|text data format.
					if (options.dataType === "json") {
						data = JSON.parse(_xhr.responseText);
					} else if (options.dataType === "xml"){
						data = _xhr.responseXML;
					} else {
						data = _xhr.responseText;
					}

					options.success(data);

				} catch(e) {

					if (typeof options.error !== "function") return console.error(message.cast);
					return options.error({status: message.cast, url: options.url});

				}

			} else if (this.readyState === this.DONE && this.status !== 200) {

				return options.error({status: _xhr.statusText});

			}

		}, false);

		_xhr.addEventListener("error", function (event) {
			options.error(event);
		}, false);

		// Send requet
		_xhr.send(null);

	};

	var sendPost = function() {
		var _xhr, form, data;
		return function(options) {
			/*
				verify, if interval and timeout are defined.
			*/
			if (options.credential === "undefined" || options.credential !== true) {
				options.credential = false;
			}


			if (typeof options.formData !== 'undefined') {
				form = new FormData(options.formData);
			} else if (options.data !== 'undefined'){

				form = new FormData();

				for (var name in options.data) {
					form.append(name, options.data[name]);
				}

			} else {

				if (typeof options.error !== "undefined" && typeof options.error === "function") {
					return options.error({status: message.dataNoSend});
				}

				throw new Error(message.dataNoSend);

			}

			_xhr = this.xhr();

			if (options.timeout !== "undefined" && typeof options.timeout === "number") {
				_xhr.timout = options.timeout;
			}

			_xhr.open("POST", options.url);

			if (options.credential !== "undefined") {
				_xhr.withCredentials = options.credential;
			}

			if(options.type !== 'undefined') {
				_xhr.overrideMimeType(options.type);
				_xhr.setRequestHeader("Content-Type", options.type);
			}

			_xhr.addEventListener("load", function () {

				if (this.readyState === this.DONE &&  this.status === 200) {

					try {
						options.success(JSON.parse(_xhr.responseText));
					} catch(e) {
						console.error(message.cast, e);
						return options.error({status: message.cast});
					}

				} else if (this.readyState === this.DONE && this.status !== 200) {
					return options.error({
						code: _xhr.status,
						statusText: _xhr.statusText,
						host: options.host
					});
				}

			}, false);

			_xhr.addEventListener("error", function (event) {
				options.error(event);
			}, false);

			_xhr.send(form);
		};
	};
 	/*
		JSON and XML request handler
	*/
	var sendXMLOrJSOM = function(msg, type) {
		return function(url, fn) {

			var _xhr = this.xhr();
			_xhr.open("GET", url);
			// load listener
			_xhr.onload = function () {
				if (type === "json") fn(JSON.parse(_xhr.responseText));
				else if (type === "xml") fn(_xhr.responseXML);
			};
			// error listener
			_xhr.onerror = function (e) {
				fn(e);
			};

			_xhr.send(null);

			// Return doo object, for caning chain.
			return this;
		};
	};

	/**
	* get,  fonction permettant de
	*/
	return function() {

		this.get = function (options) {
			/*
				If option is a string, then get must send request using this arch.
				get(url, function(err, data){});
			*/
			if (arguments.length > 1) {
				if (typeof options === "string") {
					if (typeof arguments[1] === "function") {
						// Get function is defined in arguments
						var fn = arguments[1];
						var _xhr = this.xhr();
						_xhr.open("GET", options);
						_xhr.onload = function () {
							try {
								fn(false, JSON.parse(_xhr.responseText));
							} catch(e) {
								console.error(message.cast);
							}
						};
						_xhr.onerror = function (e) {
							fn({status: e}, null);
						};
						_xhr.send(null);
						return this;
					}
				}
			}
			/*
				credential at true if it's defined
			*/
			if (typeof options.credential === "undefined" || typeof options.credential === "boolean") {
				options.credential = false;
			}
			/*
				verify, if interval and timeout are defined.
			*/
			if (typeof options.interval !== 'undefined' && typeof options.timeout !== 'undefined') {

				options.error({error: !0, status: message.timeError});
				throw new Error(message.timeError);

			}
			/*
				Verify if dataType is defined
			*/
			if (typeof options.dataType === "undefined") {
				options.dataType = "json";
			}
			/*
				Request interval
			*/
			if (typeof options.interval !== "undefined") {
				next(sendGet, options, options.interval);
			} else {
				sendGet(options);
			}

			// Return doo object, for caning chain.
			return this;
		};
		/*
			Get JSON data
		*/
		this.getJSON = sendXMLOrJSOM(message.isJSON, "json");
		/*
			Get xml data
		*/
		this.getXML = sendXMLOrJSOM(message.isXML, "xml");
		/*
	    * POST, function
	    */
		this.post = sendPost();
	};


})();

// version
Doo.prototype.version = "0.1.2";

// return xhr object, if you want use Ajax otherwise.
Doo.prototype.xhr = function () {

	return xhr();

};

// doo object added in window
this.doo = new Doo();

}).call(this);
