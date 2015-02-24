var doDownload = require('../lib/do-download');
var LocalTrack = require('../lib/LocalTrack');

var SC = require('node-soundcloud');
SC.init(require(__dirname+'/../conf/soundcloud.json'));


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
    localTrack.beats(function(err,beats){
      res.header('Content-Type','application/json');
      res.send(JSON.stringify(beats));
    });
    return;
  }

  SC.get('/tracks/' + trackId, function(err, track) {
    if ( err ) { throw err; }
    var streamMetaPath = track.stream_url.replace(/https?:\/\/[^\/]+\//,'/');

    SC.get(streamMetaPath, function(err, stream){
      doDownload(stream.location, localTrack.getDir(), localTrack.getFileName(), function(err){
        localTrack.beats(function(err,beats){
          res.header('Content-Type','application/json');
          res.send(JSON.stringify(beats));
        });
      });
    });
  });
});

module.exports = router;
