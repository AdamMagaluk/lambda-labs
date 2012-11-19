var util = require('util');
var Client = require('./client');
var fs = require('fs');
var path = require('path');
var request = require('request');
var qs  = require('querystring')

function Detect(options){
	this.parseOptions(options)
}

util.inherits(Detect, Client);

Detect.prototype._detectFacesLocal = function(image,callback){
	var self = this;
	var headers = {};
	headers.extend(this.auth);

	fs.stat(path.normalize(image),function(err,stats){
		if(err)
			return callback(err,null);

		// I know im doing this wrong...
		headers['Content-Length'] = stats.size + image.length + 143;
		var r = request.post(self._requestOptions(headers,'/detect'),function(err,responce,body){callback(err,responce,JSON.parse(body))});
		var form = r.form()
		form.append('files', fs.createReadStream(image))
	})
}
Detect.prototype._detectFacesWeb = function(image,callback){
	var headers = {};
	headers.extend(this.auth);
	
	var options = this._requestOptions(headers,'/detect');
	options.url += "?" +  qs.stringify({ urls: image }) 
	var r = request.post(options,function(err,responce,body){callback(err,responce,JSON.parse(body))} );
}

Detect.prototype.detectFaces = function(image,callback){
	if(this._ValidURL(image))
		this._detectFacesWeb(image,callback);	
	else
		this._detectFacesLocal(image,callback);
}

module.exports = Detect;