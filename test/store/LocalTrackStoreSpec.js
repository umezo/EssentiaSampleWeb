var expect = require('expect.js');
var LocalTrackStore = require('../../lib/store/LocalTrackStore');
var path = require('path');
var fs = require('fs');

describe('LocalTrackStore',function(){
  var mp3filepath = __dirname+'/../fixtures/fooraijin.mp3';
  var mp3dirname = path.dirname(mp3filepath);

  beforeEach(clean);
  afterEach(clean);

  function clean(){
    var lt = new LocalTrackStore(mp3filepath);
    try {
      fs.unlinkSync(lt._beatsFilePath());
    } catch(e) {
    }

    try {
      fs.unlinkSync(lt._beatsMarkedSoundFilePath());
    } catch(e) {
    }
  }

  it('basic api call',function(){

    var lt = new LocalTrackStore(mp3filepath);

    expect(lt._beatsFilePath()).to.be(mp3dirname+'/beats.json');
    expect(lt._beatsMarkedSoundFilePath()).to.be(mp3dirname+'/beats.mp3');

    expect(lt.beats()).to.not.be.an('array');

  });

  it('initialize',function(){

    var lt = new LocalTrackStore(mp3filepath);
    lt.on('initialize',function(){
      expect(lt.beats()).to.be.an('array');
      expect(lt.beats()).to.not.be.empty();
    }).on('error',function(err){
      console.log(err);
      expect().fail("error during initialization");
    });

    lt.initialize();
  });
});

