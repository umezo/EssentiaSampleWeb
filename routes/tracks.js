var querystring = require('querystring');
var fs = require('fs');
var config = require('config');
var _ = require('lodash');

var SoundCloudTrackStore = require('../lib/store/SoundCloudTrackStore');
var LocalTrack = require('../lib/store/LocalTrackStore');

var SOUNDS_DIR = __dirname+'/../'+config.get('dir.sounds');

var SC = require('node-soundcloud');
SC.init(config.get('soundcloud'));

var router = require('express').Router();
router.get('/', function(req, res, next) {
  var query = querystring.stringify({
    'bpm[from]': 120,
    'bpm[to]': 150,
    'duration[from]': 10 * 1000,
    'duration[to]': 90 * 1000,
    tags:'house',
    filter:'public',
    limit:20
  });
  SC.get('/tracks?' + query, function(err, tracks) {
    if ( err ) {
      throw err;
    }
    res.render('tracks.html',{
      tracks:_.filter(tracks,function(e){return e.streamable;}).slice(0,5)
    });
  });
});

router.get('/:id', function(req, res, next) {

  SC.get('/tracks/' + req.params.id , function(err, track) {
    if ( err ) {
      throw err;
    }
    res.render('tracks.html',{tracks:[track]});
  });
});

router.get('/:id/beats', function(req, res, next) {
  var trackId = req.params.id;
  var soundCloudTrackStore = new SoundCloudTrackStore(trackId);
  soundCloudTrackStore.download(SOUNDS_DIR+'/'+trackId,function(err,filepath){
    if (err) {
      throw JSON.stringify(err);
    }

    var localTrack = new LocalTrack(filepath);

    localTrack.on('initialize',function(err,track){
      res.header('Content-Type','application/json');
      res.send(JSON.stringify(localTrack.beats()));
    }).on('error',function(err){
      res.send(JSON.stringify(err));
    });

    localTrack.initialize();
  });
});

router.get('/:id/beats/stream', function(req, res, next) {
  var trackId = req.params.id;
  var soundCloudTrackStore = new SoundCloudTrackStore(trackId);
  soundCloudTrackStore.download(SOUNDS_DIR+'/'+trackId,function(err,filepath){
    if (err) {
      console.log(err);
      throw err;
    }

    var localTrack = new LocalTrack(filepath);

    localTrack.on('initialize',function(err,track){
      res.redirect('/sounds/'+trackId+'/beats.mp3');
    }).on('error',function(err){
      res.send(JSON.stringify(err));
    });

    localTrack.initialize();
  });
});

module.exports = router;
