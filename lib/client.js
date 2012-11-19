var crypto = require('crypto');

Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            var destination = Object.getOwnPropertyDescriptor(from, name);
            Object.defineProperty(dest, name, destination);
        });
        return this;
    }
});

function Client(){

};


Client.prototype._ValidURL = function(str) {
  var pattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/); // fragment locater
  return pattern.test(str);
}


Client.prototype.options = {
		baseUrl : 'https://lambda-face-recognition.p.mashape.com' 
};	

Client.prototype.auth = {
        'X-Mashape-Authorization' : '',
};  

Client.prototype.parseOptions = function(opts){

	if(typeof opts.publicKey != "string" || typeof opts.privateKey != "string"){
		throw new Error("publicKey or private not defined as string in the options.");		
	}

	this.options = this.options.extend(opts);

    var hash = crypto.createHmac('sha1', this.options.privateKey)
    .update(this.options.publicKey)
    .digest('hex')

    this.auth['X-Mashape-Authorization'] = new Buffer(this.options.publicKey+':'+hash).toString('base64')
}
	

Client.prototype._requestOptions = function(headers,resource){
    return {
        headers: headers,
        url: this.options.baseUrl+resource
    }
}

Client.prototype.test = function(callback){
	setTimeout(callback(null,33),1000);
}


module.exports = Client;