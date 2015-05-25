/**
* doo v0.1.0
*
* Create and maintener by Dakia Franck
* http://github.com/papac/doojs
*/
(function(){

"use strict";

var dooXhr = function() {

	return "XMLHttpRequest" in window 
	? new XMLHttpRequest() 
	: new ActiveXObejct(Microsoft.XML);

};

var networkMessage = function() {
	throw new Error("Verifiez votre connection réseau.");
};

var errorMessage = function($msg) {

	throw new TypeError(msg);

};


var  Doo = function () {

	this.get = function(url, fn){
	
		var _xhr = null;
	
		_xhr = dooXhr();
	
		_xhr.open("GET", url);
	
		_xhr.withCredentials = true;

		_xhr.addEventListener("readystatechange", function() {

			if(this.readyState === this.DONE &&  this.status === 200) {
					
				return fn(null, JSON.parse(_xhr.responseText));
			
			}else if(this.readyState === this.DONE && this.status !== 200) {
				
				return fn({
					
					code: _xhr.status,
					statusText: _xhr.statusText
				
				}, undefined);
			}
		}, false);

		_xhr.addEventListener("error", function(event){
			
			networkMessage();

		}, false);

		_xhr.send();

		return this;
	};

	this.post = function(url, data, fn){

		var _xhr = null, form;
		
		form = new FormData();
		_xhr = dooXhr();

		for(name in data) { 

			form.append(name, data[name]);

		}

		_xhr.open("POST", url);
		
		_xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		_xhr.withCredentials = true;

		_xhr.addEventListener("readystatechange", function() {

			if(this.readyState === this.DONE &&  this.status === 200) {

				return fn(JSON.parse(_xhr.responseText));
			
			}else if(this.readyState === this.DONE && this.status !== 200) {

				return fn({
				
					code: _xhr.status,
					statusText: _xhr.statusText,
					url: url
				
				});

			}
		}, false);

		_xhr.addEventListener("error", function(event) {

			networkMessage();
		
		}, false);

		_xhr.send(form);

		return this;
	};

	this.timeout = function(cb, ms) {

		if(typeof cb === 'function') {

			setTimeout(cb, ms, this);
		
		} else {

			errorMessage(cb + " not a function.");
		}

		return this;

	};
	this.timeinterval = function(cb, ms) {

		if(typeof cb === 'function') {

			setInterval(cb, ms, this);
		
		} else {

			errorMessage(cb + " not a function.");
		}

		return this;
	}
};

Doo.prototype.version = "0.1.0";

this.doo = new Doo();

}).call(this);