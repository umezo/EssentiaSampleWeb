var querystring = require('querystring');
var fs = require('fs');
var config = require('config');
var _ = require('lodash');

var SoundCloudTrackStore = require('../lib/store/SoundCloudTrackStore');
var LocalTrack = require('../lib/store/LocalTrackStore');

var SOUNDS_DIR = __dirname+'/../'+config.get('dir.sounds');

var SC = require('node-soundcloud');
SC.init(config.get('soundcloud'));


function TrackController(){}

_.assign(TrackController.prototype,{
  /**
   * 適当にSoundCloudから曲を取ってきて出す
   * querystringはtagsだけ対応
   * 絞り込みはハードコーディング、短すぎても長すぎても困るので
   */
  index: function(req,res,next){

    //soundcloud用のクエリ
    var query = querystring.stringify({
      'bpm[from]': 120,
      'bpm[to]': 150,
      'duration[from]': 10 * 1000,
      'duration[to]': 90 * 1000,
      tags:req.query.tags||'house',
      filter:'public',
      limit:20
    });

    //sound cloud API call
    SC.get('/tracks?' + query, function(err, tracks) {
      if ( err ) { next(err); }

      //あとで曲をダウンロードするのでstream可能なやつだけに絞る limit=5
      tracks = _.filter(tracks,function(e){return e.streamable;}).slice(0,5);
      res.render('tracks.html',{tracks:tracks});
    });
  },

  /**
   * params.idで指定されたidのsound cloud trackを表示する
   */
  track: function(req,res,next) {
    SC.get('/tracks/' + req.params.id , function(err, track) {
      if ( err ) { next(new Error(JSON.stringify(err))); }
      res.render('tracks.html',{tracks:[track]});
    });
  },

  /**
   * params.idで指定されたidのビート情報を返す
   */
  beats: function(req,res,next) {
    var trackId = req.params.id;


    var soundCloudTrackStore = new SoundCloudTrackStore(trackId);
    soundCloudTrackStore.download(SOUNDS_DIR+'/'+trackId,function(err,filepath){
      if (err) {throw err;}

      var localTrack = new LocalTrack(filepath);

      localTrack.on('initialize',function(err,track){
        res.header('Content-Type','application/json');
        res.send(JSON.stringify(localTrack.beats()));
      }).on('error',function(err){
        throw err;
      });

      localTrack.initialize();
    });
  },

  /**
   * params.idで指定されたidのビートクリック音が合成された曲本体を返す
   */
  stream: function(req,res,next) {
    var trackId = req.params.id;
    var soundCloudTrackStore = new SoundCloudTrackStore(trackId);
    soundCloudTrackStore.download(SOUNDS_DIR+'/'+trackId,function(err,filepath){
      if (err) { throw err; }

      var localTrack = new LocalTrack(filepath);

      localTrack.on('initialize',function(err,track){
        // これハードコーディングしてんのダメだな
        res.redirect('/sounds/'+trackId+'/beats.mp3');
      }).on('error',function(err){
        res.send(JSON.stringify(err));
      });

      localTrack.initialize();
    });
  }
});

var controller = new TrackController();
var router = require('express').Router();
router.get('/', controller.index);
router.get('/:id', controller.track);
router.get('/:id/beats', controller.beats);
router.get('/:id/beats/stream', controller.stream);

module.exports = router;
