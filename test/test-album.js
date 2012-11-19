var Album = require('../lib/lambda-labs').Album;
var Detect = require('../lib/lambda-labs').Detect;

var config = require('../config');
var options = config.api_config;

var assert = require("assert")
describe('Album', function(){

  describe('#exists()', function(){


    it('test-album does not exist.', function(done){
		var album = new Album('test-album','key',options);
	  	album.exists(function(err,exists){
	  		assert.equal(exists,false);
	  		done();
	  	})
    })


    it('CELEBS does not exist.', function(done){
    	var album = new Album('CELEBS','b1ccb6caa8cefb7347d0cfb65146d5e3f84608f6ee55b1c90d37ed4ecca9b273',options);
	  	album.exists(function(err,exists){
	  		assert.equal(exists,true);
	  		done();
	  	})
    })
    


	it('Create CELEBS should fail.', function(done){
		var album = new Album('CELEBS',options);
	  	album.create(function(err,exists){
	  		assert.equal(err.code,500);
	  		done();
	  	})
    })


	it('View should work on CELEBS.', function(done){
		var album = new Album('CELEBS','b1ccb6caa8cefb7347d0cfb65146d5e3f84608f6ee55b1c90d37ed4ecca9b273',options);
	  	album.view(function(err,ret){
	  		assert.ifError(err);
	  		assert.equal('CELEBS',ret.name);
	  		assert.equal(6,ret.size);
	  		done();
	  	})
    })

	it('View should not work on asd.', function(done){
		var album = new Album('asdasd','asas',options);
	  	album.view(function(err,ret){
	  		assert.equal(500,err.code);
	  		assert.equal(null,ret);
	  		done();
	  	})
    })


	it('Create album by datestamp should succeed.', function(done){
		var name = "testalbum"+Math.round(new Date().getTime()/1000.0);
		var album = new Album(name,options);
	  	album.create(function(err,ret){
	  		assert.equal(err,null);
	  		assert.equal(album.Key(),ret.albumkey);
	  		
			album.view(function(err,ret){
	  			assert.equal(err,null);
	  			assert.equal(name,ret.name);
	  			done();
	  		});
	  	})

    })






  })
})
  
