lambda-labs
===========

Node module for Lambda Labs Face Recognition API βeta

Lambda Labs Api - http://api.lambdal.com/?ref=homepage


Installation
------------
npm install lambda-labs

Usage
-----

*Detect Faces on Local Image*
```javascript

var Detect = require('lambda-labs').Detect;
var detect = new Detect({publicKey : "YOUR_API_KEY",privateKey : "YOUR_API_KEY"});
detect.detectFaces('test.jpg',function(err,responce,ret){
	if(err){
		return console.log("Something failed")
	}

	console.log(ret)
}
});

```