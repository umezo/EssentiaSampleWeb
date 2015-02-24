var fs = require('fs');
var doDownload = require('../lib/do_download');

var SC = require('node-soundcloud');
SC.init(require(__dirname+'/../conf/soundcloud.json'));

var SOUNDS_DIR = __dirname+'/../sounds';

var router = require('express').Router();
router.get('/', function(req, res, next) {
  SC.get('/tracks', function(err, tracks) {
    if ( err ) {
      throw err;
    }
    res.render('tracks.html',{tracks:tracks});
  });
});

router.get('/:id', function(req, res, next) {
  SC.get('/tracks/' + req.params.id, function(err, track) {
    if ( err ) {
      throw err;
    }
    res.render('tracks.html',{tracks:[track]});
  });
});

router.get('/:id/beats', function(req, res, next) {
  var trackId = req.params.id;

  var localTrack = new LocalTrack(trackId);

  if (localTrack.exists()) {
    res.render('tracks.html',{tracks:[]});
    return;
  }

  SC.get('/tracks/' + trackId, function(err, track) {
    if ( err ) { throw err; }
    var streamMetaPath = track.stream_url.replace(/https?:\/\/[^\/]+\//,'/');

    SC.get(streamMetaPath, function(err, stream){
      var file = stream.location.split('?')[0].split('/').pop();
      doDownload(stream.location, localTrack.getDir(), file,function(err){
        res.render('tracks.html',{tracks:[]});
      });
    });
  });
});

function LocalTrack(trackId){
  this.id = trackId;
}
LocalTrack.prototype.getDir = function(){
  return SOUNDS_DIR+'/'+this.id;
};
LocalTrack.prototype.exists = function(){
  try {
    fs.statSync(this.getDir());
    return true;
  } catch(e) {
    return false;
  }
};




module.exports = router;
