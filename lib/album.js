var util = require('util');
var Client = require('./client');
var fs = require('fs');
var path = require('path');
var request = require('request');
var qs  = require('querystring')


// name,key,opts
function Album(){
	var options = arguments[arguments.length-1] || {};

	if(arguments.length == 2){
		options.albumName = arguments[0];		
	}else if(arguments.length >= 3){
		options.albumName = arguments[0];
		options.albumKey = arguments[1];
	}else{
		throw new Error("Album, provide either: Album(name,options,callback) or Album(name,key,options,callback)");
	}

	this.albumName =  options.albumName;
	this.albumKey = options.albumKey;

	this.parseOptions(options)
}

util.inherits(Album, Client);

Album.prototype.Name = function(){return this.albumName;}
Album.prototype.Key = function(){return this.albumKey;}

Album.prototype.exists = function(callback){
	
	var headers = {};
	headers.extend(this.auth);
	
	var options = this._requestOptions(headers,'/album');
	options.url += "?" +  qs.stringify({ album: this.albumName,albumkey: this.albumKey }) 

	var r = request.get(options,function(err,response,body){
		if (!err && response.statusCode == 200)
			callback(null,true);
		else 
			callback(null,false);
	});
}

Album.prototype.create = function(callback){
	var self = this;
	var headers = {};
	headers.extend(this.auth);
	
	var options = this._requestOptions(headers,'/album');
	options.url += "?" +  qs.stringify({ album: this.albumName}) 
	var r = request.post(options,function(err,response,body){
		if (!err && response.statusCode == 200){
			var ret = JSON.parse(body);
			self.albumKey = ret.albumkey;
			callback(null,ret);
		}
		else if(!err)
			callback(JSON.parse(body),null);
		else 
			callback(err,null);
	});	

}

Album.prototype.view = function(callback){
	var headers = {};
	headers.extend(this.auth);
	
	var options = this._requestOptions(headers,'/album');
	options.url += "?" +  qs.stringify({ album: this.albumName,albumkey: this.albumKey }) 

	var r = request.get(options,function(err,response,body){
		if (!err && response.statusCode == 200)
			callback(null,JSON.parse(body) );
		else{ 
			callback(JSON.parse(body),null);
		}
	});

}

Album.prototype.rebuild = function(callback){
}

Album.prototype.train = function(entry,file,callback){
}




module.exports = Album;