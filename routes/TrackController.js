const querystring = require('querystring');
const fs = require('fs');
const config = require('config');
const SC = require('node-soundcloud');

const SoundCloudTrackStore = require('../lib/store/SoundCloudTrackStore');
const LocalTrack = require('../lib/store/LocalTrackStore');

const SOUNDS_DIR = __dirname+'/../'+config.get('dir.sounds');

SC.init(config.get('soundcloud'));

class TrackController {
  /**
   * 適当にSoundCloudから曲を取ってきて出す
   * querystringはtagsだけ対応
   * 絞り込みはハードコーディング、短すぎても長すぎても困るので
   */
  index(req,res,next){

    //soundcloud用のクエリ
    const query = querystring.stringify({
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
      tracks = tracks.filter(function(e){
        return e.streamable;
      }).slice(0,5);
      res.render('tracks.html',{tracks:tracks});
    });
  }

  /**
   * params.idで指定されたidのsound cloud trackを表示する
   */
  track(req,res,next) {
    SC.get('/tracks/' + req.params.id , function(err, track) {
      if ( err ) { next(new Error(JSON.stringify(err))); }
      res.render('tracks.html',{tracks:[track]});
    });
  }

  /**
   * params.idで指定されたidのビート情報を返す
   */
  beats(req,res,next) {
    const trackId = req.params.id;

    const soundCloudTrackStore = new SoundCloudTrackStore(trackId);
    soundCloudTrackStore.download(SOUNDS_DIR+'/'+trackId,function(err,filepath){
      if (err) {throw err;}

      const localTrack = new LocalTrack(filepath);

      localTrack.on('initialize',function(err,track){
        res.header('Content-Type','application/json');
        res.send(JSON.stringify(localTrack.beats()));
      }).on('error',function(err){
        throw err;
      });

      localTrack.initialize();
    });
  }

  /**
   * params.idで指定されたidのビートクリック音が合成された曲本体を返す
   */
  stream(req,res,next) {
    const trackId = req.params.id;
    const soundCloudTrackStore = new SoundCloudTrackStore(trackId);
    soundCloudTrackStore.download(SOUNDS_DIR+'/'+trackId,function(err,filepath){
      if (err) { throw err; }

      const localTrack = new LocalTrack(filepath);

      localTrack.on('initialize',function(err,track){
        // これハードコーディングしてんのダメだな
        res.redirect('/sounds/'+trackId+'/beats.mp3');
      }).on('error',function(err){
        res.send(JSON.stringify(err));
      });

      localTrack.initialize();
    });
  }

}

module.exports = TrackController;
