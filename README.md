lambda-labs
===========

Node module for Lambda Labs Face Recognition API βeta

Lambda Labs Api - http://api.lambdal.com/?ref=homepage


Installation
------------
```npm install lambda-labs```

Usage
-----

*Detect Faces on Images*
```javascript

var Detect = require('lambda-labs').Detect;
var detect = new Detect({publicKey : "YOUR_API_KEY",privateKey : "YOUR_API_KEY"});

// Detect from local image
detect.detectFaces('test.jpg',function(err,responce,ret){
	if(err) return console.log("Something failed")
	console.log(ret)
});

// Detect from web url
detect.detectFaces('http://farm9.staticflickr.com/8210/8174145303_4c0a875e0d_b.jpg',function(err,responce,ret){
	if(err) return console.log("Something failed")
	console.log(ret)
});

```
