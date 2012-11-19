var Detect = require('../lib/lambda-labs').Detect;

var config = require('../config');
var options = config.api_config;

var assert = require("assert")
describe('Detect', function(){
  describe('#test()', function(){
    
    it('should return 33', function(){
      var detect = new Detect(options);

      detect.test(function(err,test){
        if (err) throw err;
        assert.equal(33,test);
      });

    })

  })

  describe('#detectFaces()', function(done){
    it('should not work, local file does not exist.', function(){
      var detect = new Detect(options);
      detect.detectFaces('nonexistantimage.jpg',function(err,ret){
        assert.equal(err.errno,34)
        done();
      });
    })

    it('should work, testing on test.jpg.', function(done){
      var detect = new Detect(options);
      detect.detectFaces('test/test.jpg',function(err,responce,ret){
        assert.ifError(err);
        assert.equal(responce.statusCode,200);
        assert.equal(ret.status,"success");
        done();
      });
    })

    it('should work, testing on http://farm9.staticflickr.com/8210/8174145303_4c0a875e0d_b.jpg.', function(done){
      var detect = new Detect(options);
      detect.detectFaces('http://farm9.staticflickr.com/8210/8174145303_4c0a875e0d_b.jpg',function(err,responce,ret){
        assert.ifError(err);
        assert.equal(responce.statusCode,200);
        assert.equal(ret.status,"success");
        done();
      });
    })


  })

  
})
