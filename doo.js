/**
* doo v0.0.5
*
* Create and maintener by Dakia Franck and diagnostic develper
* - Etchien Boa
* - Zokora Elvice
* http://github.com/papac/doojs
*/

(function(){

"use strict";

var  Doo = function () {

	this.get = function(options){

		if(options.interval != "undefined" && options.timeout != "undefined") {

			options.error({error: 0, status: "not define interval and timeout"});
			throw new Error("not define interval and timeout");
		
		}

		if(options.dataType == undefined) {
			
			options.dataType = "json";

		}

		var _xhr = null;
	
		_xhr = this.dooXhr();
	
		_xhr.open(options.method, options.url + (options.data != undefined ? "?" + options.data : ""));
	
		_xhr.withCredentials = true;

		if(options.type != undefined) {
		
			_xhr.setRequestHeader("Content-Type", options.type);
		
		}

		_xhr.addEventListener("load", function() {

			if(this.readyState === this.DONE &&  this.status === 200) {
				
				var data = {};

				if(options.dataType === "json") {

					data = JSON.parse(_xhr.responseText);

				} else if (options.dataType === "xml"){
				
					data = _xhr.responseXML;
				
				} else {

					data = _xhr.responseText;

				}

				
				if(typeof options.timeout == "undefined") {

					return setTimeout(options.success, options.timeout, data);

				} else if(typeof options.interval == "undefined"){

					return setInterval(options.success, options.interval, data);

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

		_xhr.send();

		return this;
	};

	this.post = function(options){

		var _xhr = null, form;
		
		form = new FormData();
		_xhr = dooXhr();

		for(name in options.data) { 

			form.append(name, options.data[name]);

		}

		_xhr.open(options.method, options.url);
				
		_xhr.withCredentials = true;

		if(options.type != undefined) {
		
			_xhr.setRequestHeader("Content-Type", options.type);
		
		}

		_xhr.addEventListener("load", function() {

			if(this.readyState === this.DONE &&  this.status === 200) {
				console.log(this.timeout);
				return options.success();
			
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

Doo.prototype.version = "0.0.5";
Doo.prototype.dooXhr = function() {

	return "XMLHttpRequest" in window 
	? new XMLHttpRequest() 
	: new ActiveXObejct(Microsoft.XML);

};

this.doo = new Doo();

}).call(this);