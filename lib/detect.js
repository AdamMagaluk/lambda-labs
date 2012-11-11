var util = require('util');
var Client = require('./client');
var fs = require('fs');
var path = require('path');
var request = require('request');
var qs  = require('querystring')

function ValidURL(str) {
  var pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/); // fragment locater
  return pattern.test(str);
}

function Detect(options){
	this.parseOptions(options)
}

util.inherits(Detect, Client);

Detect.prototype._detectFacesLocal = function(image,callback){
	var self = this;
	fs.stat(path.normalize(image),function(err,stats){
		if(err)
			return callback(err,null);

		// I know im doing this wrong...
		self.headers['Content-Length'] = stats.size + image.length + 143;

		var r = request.post(self._requestOptions(),function(err,responce,body){callback(err,responce,JSON.parse(body))});
		var form = r.form()
		form.append('files', fs.createReadStream(image))
	})
}
Detect.prototype._detectFacesWeb = function(image,callback){
	var options = this._requestOptions();
	options.url += "?" +  qs.stringify({ urls: image }) 
	var r = request.post(options,function(err,responce,body){callback(err,responce,JSON.parse(body))} );
}

Detect.prototype.detectFaces = function(image,callback){
	if(ValidURL(image))
		this._detectFacesWeb(image,callback);	
	else
		this._detectFacesLocal(image,callback);
}

module.exports = Detect;