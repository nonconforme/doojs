/**
* ====================================================================================
* doo v0.0.8
*
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

var next = function(fn, data, ms) {

	fn(data);
	setTimeout(next, ms, fn, data, ms);

};

var  Doo = function () {
	/**
	* get,  fonction permettant de
	*/
	this.get = function(options){
		var _xhr = {};

		if(arguments.length > 1) {

			if(typeof options == "string") {
				if(typeof arguments[1] == "function") {
					var fn = arguments[1];
					_xhr = this.xhr();
					_xhr.open("GET", options);
					_xhr.onload = function() {
						fn(JSON.parse(_xhr.responseText));
					};
					_xhr.onerror = function(e){
						fn({err: e});
					};
					_xhr.send(null);
					return this;
				}
			}
		}

		if(options.interval !== 'undefined' && options.timeout !== 'undefined') {

			options.error({error: 0, status: "not define interval and timeout"});
			throw new Error("not define interval and timeout");

		}

		if(options.dataType === 'undefined') {

			options.dataType = "json";

		}

		data = "";

		_xhr = this.xhr();
		_xhr.timout = 3000;

		if(options.data !== undefined) {

			if(!/\?$/.test(options.url)) {

				data = "?";

			}

			data += options.data;

		}

		_xhr.open("GET", options.url + encodeURIComponent(data));

		_xhr.withCredentials = true;

		if(options.type !== 'undefined') {

			_xhr.overrideMimeType(options.type);
			_xhr.setRequestHeader("Content-Type", options.type);

		}

		_xhr.addEventListener("load", function() {

			if(this.readyState === this.DONE &&  this.status === 200) {

				var data = {};

				try {

					if(options.dataType === "json") {

						data = JSON.parse(_xhr.responseText);

					} else if (options.dataType === "xml"){

						data = _xhr.responseXML;

					} else {

						data = _xhr.responseText;

					}


				} catch(e) {

					console.error("les données réçus non pas pu être transtyper.", e);
					options.error({error: 1, status: _xhr.responseText});

				}

				if(typeof options.timeout !== "undefined") {

					return setTimeout(options.success, options.timeout, data);

				} else if(typeof options.interval !== "undefined"){

					return next(options.success, data, options.interval);

				} else {

					return options.success(data);

				}

			}else if(this.readyState === this.DONE && this.status !== 200) {

				return options.error({
					error: _xhr.status,
					status: _xhr.statusText
				});

			}

		}, false);

		_xhr.addEventListener("error", function(event){

			options.error(event);

		}, false);

		_xhr.send(null);

		return this;
	};

	/*
		Get JSON data
	*/
	this.getJSON = function(url, fn) {

		if(url.indexOf(".json") === -1) {
				fn({error: "File isn't JSON."});
				return;
		}

		var _xhr = this.xhr();
		_xhr.open("GET", url);
		_xhr.onload = function() {
			fn(JSON.parse(_xhr.responseText));
		};
		_xhr.onerror = function(e) {
			fn(e);
		};
		_xhr.send(null);
		
	};

    /**
    * post, function
    */
	this.post = function(options){

		var _xhr = null,
			form,
			data;

		if(options.formData !== 'undefined') {

			form = new FormData(options.formData);

		} else if (options.data !== 'undefined'){

			form = new FormData();

			for(var name in options.data) {

				form.append(name, options.data[name]);

			}

		} else {

			throw new Error("Tu fais un post sans envoyer de donnée.");

		}

		_xhr = this.xhr();
		_xhr.timout = 3000;

		_xhr.open("POST", options.url);

		_xhr.withCredentials = true;

		if(options.type !== 'undefined') {

			_xhr.setRequestHeader("Content-Type", options.type);

		}

		_xhr.addEventListener("load", function() {

			if(this.readyState === this.DONE &&  this.status === 200) {

				try {

					options.success(JSON.parse(_xhr.responseText));

				}catch(e) {

					console.error("les données réçus non pas pu être transtyper.", e);
					return options.error({error: 1, status: _xhr.responseText});

				}

			}else if(this.readyState === this.DONE && this.status !== 200) {

				return options.error({
					code: _xhr.status,
					statusText: _xhr.statusText,
					url: options.url
				});

			}

		}, false);

		_xhr.addEventListener("error", function(event) {

			options.error(event);

		}, false);

		_xhr.send(form);

		return this;
	};

};

Doo.prototype.version = "0.0.7";
Doo.prototype.xhr = function() {

	return "XMLHttpRequest" in window ? new XMLHttpRequest()
	: new ActiveXObejct(Microsoft.XML);

};

this.doo = new Doo();

}).call(this);
