var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var doDownload = require('node-download');

var config = require('config');

var scConfig = config.get('soundcloud');
var SC = require('node-soundcloud');
SC.init(scConfig);

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
   * @return string stream url
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
      var streamMetaPath = track.stream_url;
      this._stream = streamMetaPath;

      callback(null, this._stream);
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

      var filename = this._createFileName(stream);
      var destFilePath = outputDir + '/' + filename;

      try {
        fs.statSync(destFilePath);
        callback(null,destFilePath);
      } catch(e) {
        doDownload(stream + '?client_id=' + scConfig.id, outputDir, filename, function(err){
          callback(err,destFilePath);
        });
      }
    }.bind(this));
  },

  _createFileName: function(stream){
    var ext = '.mp3';
    var filename = 'original'+ext;
    return filename;
  }
});

module.exports = SoundCloudTrackStore;
