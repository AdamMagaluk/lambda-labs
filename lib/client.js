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

Client.prototype.options = {
		baseUrl : 'https://lambda-face-recognition.p.mashape.com' 
};	

Client.prototype.headers = {
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

    this.headers['X-Mashape-Authorization'] = new Buffer(this.options.publicKey+':'+hash).toString('base64')
}
	

Client.prototype._requestOptions = function(resource){
    return {
        headers: this.headers,
        url: this.options.baseUrl+'/detect'
    }
}

Client.prototype.test = function(callback){
	setTimeout(callback(null,33),1000);
}


module.exports = Client;