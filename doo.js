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
* doo v0.1.2
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

// make recusive sended request.
var next = function (fn, options, ms) {

	fn(options);
	setTimeout(next, ms, fn, options, ms);

};

var  Doo = (function () {
	/**
	* @private sendGet, sendPost, sendJSON
	* There are private function
	*/

	var sendGet = function(options) {

		var _xhr = this.xhr();

		if (options.timeout !== "undefined" && options.timeout === "number") {
			_xhr.timout = options.timeout;
		}

		var data = "";

		if (options.pathname !== "undefined") {

			if (!/\?$/.test(options.host)) {
				data = "?";
			}

			data += encodeURIComponent(options.pathname);

		}

		_xhr.open("GET", options.host + data);
		_xhr.withCredentials = true;
		/*
			If you have defined type, system go to override mime type and request["content-type"].
		*/
		if (options.type !== "undefined") {

			_xhr.overrideMimeType(options.type);
			_xhr.setRequestHeader("Content-Type", options.type);

		}

		_xhr.addEventListener("load", function () {

			if (this.readyState === this.DONE &&  this.status === 200) {

				// Response data.
				var data = {};

				try {
					// Construction of xml|json|text data format.
					if (options.dataType === "json") {
						data = JSON.parse(_xhr.responseText);
					} else if (options.dataType === "xml"){
						data = _xhr.responseXML;
					} else {
						data = _xhr.responseText;
					}

				} catch(e) {

					console.error("received the data not been typecast.", e);
					options.error({error: 1, status: "received the data not been typecast.", response: _xhr.responseText});

				}

				options.success(data);

			} else if (this.readyState === this.DONE && this.status !== 200) {

				return options.error({
					error: _xhr.status,
					status: _xhr.statusText
				});

			}

		}, false);

		_xhr.addEventListener("error", function (event) {
			options.error(event);
		}, false);

		// Send requet
		_xhr.send(null);

	};

	var sendPost = function(xhr, options) {
		var _xhr, form, data;

		if (options.formData !== 'undefined') {
			form = new FormData(options.formData);
		} else if (options.data !== 'undefined'){

			form = new FormData();

			for (var name in options.data) {
				form.append(name, options.data[name]);
			}

		} else {

			if (options.error !== "undefined" && typeof options.error === "function") {
				return options.error({status: "You make a post without sending data..."});
			}

			throw new Error("You make a post without sending data...");

		}

		_xhr = this.xhr();

		if (options.timeout !== "undefined" && typeof options.timeout === "number") {
			_xhr.timout = options.timeout;
		}

		_xhr.open("POST", options.host);

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
					console.error("received the data not been typecast.", e);
					return options.error({error: true, status: _xhr.responseText});
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
 	/*
		JSON and XML request handler
	*/
	var sendXMLOrJSOM = function(msg, type) {
		return function(url, fn) {
			if(url.indexOf("." + type) === -1) {
				fn({error: msg}); return this; // to abort now.
			}
			var _xhr = this.xhr();
			_xhr.open("GET", url);
			_xhr.onload = function () {
				if (type === "json") fn(JSON.parse(_xhr.responseText));
				else fn(_xhr.responseXML);
			};
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
							fn(false, JSON.parse(_xhr.responseText));
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
			if (options.credential === "undefined" || options.credential !== true) {
				options.credential = false;
			}
			/*
				verify, if interval and timeout are defined.
			*/
			if (options.interval !== 'undefined' && options.timeout !== 'undefined') {

				options.error({error: 0, status: "timeout interval properties should not be set at the same time"});
				throw new Error("timeout and interval properties should not be set at the same time");

			}
			/*
				Verify if dataType is defined
			*/
			if (options.dataType === 'undefined') {
				options.dataType = "json";
			}
			/*
				Request interval
			*/
			if (options.interval !== "undefined") {
				next(sendGet, options, options.timeout);
			} else {
				sendGet(options);
			}

			// Return doo object, for caning chain.
			return this;
		};
		/*
			Get JSON data
		*/
		this.getJSON = sendJSON("File isn't JSON.", "json");
		/*
			Get xml data
		*/
		this.getXML = sendXMLOrJSOM("File isn'XML", "xml");
		/*
	    * POST, function
	    */
		this.post = function (options) {
			/*
				verify, if interval and timeout are defined.
			*/
			if (options.credential === "undefined" || options.credential !== true) {
				options.credential = false;
			}

			sendPost(options);

			// Return doo object, for caning chain.
			return this;
		};
	};


})();

Doo.prototype.version = "0.1.2";
Doo.prototype.xhr = function () {

	return "XMLHttpRequest" in window ? new XMLHttpRequest()
	: new ActiveXObejct(Microsoft.XML);

};

this.doo = new Doo();

}).call(this);
