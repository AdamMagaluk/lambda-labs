var Album = require('../lib/lambda-labs').Album;


var config = require('../config');
var options = config.api_config;

var assert = require("assert")
describe('Album', function(){

  describe('#exists()', function(){


    it('test-album does not exist.', function(){
		new Album('test-album','key',options,function(album){
		  	album.exists(function(err,exists){
		  		assert.equal(exists,false);
		  	})
		});
    })

    it('CELEBS does not exist.', function(){
    	var ret = false;
    	new Album('CELEBS','b1ccb6caa8cefb7347d0cfb65146d5e3f84608f6ee55b1c90d37ed4ecca9b273',options,function(album){
		  	album.exists(function(err,exists){
		  		ret = true;
		  		assert.equal(exists,true);
		  	})
		});
    })


  })
})
  
