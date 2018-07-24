var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var doDownload = require('node-download');

var config = require('config');

var SC = require('node-soundcloud');
SC.init(config.get('soundcloud'));

function SoundCloudTrackStore(id) {
  this._id = id;

  this._meta = null;
  this._stream = null;
}

_.assign(SoundCloudTrackStore.prototype,{
  /**
   * /track/:id APIの戻り値
   */
  meta: function(callback){
    if (this._meta) {
      callback(null,this._meta);
      return;
    }

    SC.get('/tracks/' + this._id, function(err, track) {
      if (err) {
        callback(err,this);
        return;
      }

      this._meta = track;
      callback(null,this._meta);
    }.bind(this));
  },

  /**
   * /track/:id/stream APIの戻り値
   */
  stream: function(callback){
    if (this._stream) {
      callback(null,this._stream);
      return;
    }
    this.meta(function(err,track){
      if (err) {
        callback(err);
        return;
      }
      var streamMetaPath = track.stream_url.replace(/https?:\/\/[^\/]+\//,'/');
      SC.get(streamMetaPath, function(err,stream){
        this._stream = stream;
        callback(null,this._stream);
      }.bind(this));
    }.bind(this));
  },

  /**
   * このSoundCloudの曲をoutputDirにダウンロードする
   * callback(err,destFilePath)
   */
  download: function(outputDir,callback){
    callback = callback || _.noop;
    this.stream(function(err,stream){
      if (err) {
        callback(err);
        return;
      }

      if (stream.errors) {
        callback(JSON.stringify(stream.errors));
        return;
      }

      var filename = this._createFileName(stream);
      var destFilePath = outputDir + '/' + filename;

      try {
        fs.statSync(destFilePath);
        callback(null,destFilePath);
      } catch(e) {
        doDownload(stream.location, outputDir, filename, function(err){
          callback(err,destFilePath);
        });
      }
    }.bind(this));
  },

  /**
   * 拡張子が /track/:id/stream APIの戻り値を見ないとわからないので asyncになる
   */
  filename: function(callback){
    this.stream(function(err,stream){
      if ( err ) {
        callback(err);
        return;
      }
      callback(null,this._createFileName(stream));
    }.bind(this));
  },

  _createFileName: function(stream){
    var ext = path.extname(stream.location.split('?')[0]);
    var filename = 'original'+ext;
    return filename;
  }
});

module.exports = SoundCloudTrackStore;

