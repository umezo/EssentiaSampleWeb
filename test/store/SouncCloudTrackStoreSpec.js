var expect = require('expect.js');
var SoundCloudTrackStore = require('../../lib/store/SoundCloudTrackStore');

var path = require('path');

var fs = require('fs');
var rimraf= require('rimraf');

// soundcloud の APIを直接叩いているので無効にする
// TODO APIのmocking
describe.skip('SoundCloudTrackStore',function(){
  var soundsDir = __dirname+'/../fixtures/sounds';

  before(clean);
  afterEach(clean);
  after(clean);

  function clean(){

    try {
      rimraf.sync(soundsDir);
    } catch(e) {
      console.log(e);
    }

    try {
      fs.mkdirSync(soundsDir);
    } catch(e) {
      console.log(e);
    }
  }
  it('meta',function(done){
    this.timeout(30*1000);
    var track = new SoundCloudTrackStore(157775525);
    track.meta(function(err,meta){
      done();
    });
  });

  it('filename',function(done){
    var track = new SoundCloudTrackStore(157775525);
    track.filename(function(err,filename){
      expect(filename).to.be('original.mp3'); //this case depends on sound cloud api, it has a chance to fail
      done();
    });
  });

  it('download',function(done){
    this.timeout(30*1000);
    var track = new SoundCloudTrackStore(157775525);
    track.download(soundsDir,function(err,filename){
      expect(filename).to.be(soundsDir+'/original.mp3'); //this case depends on sound cloud api, it has a chance to fail
      done();
    });
  });

});

