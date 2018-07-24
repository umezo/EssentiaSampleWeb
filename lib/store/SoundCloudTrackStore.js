const fs = require('fs');
const path = require('path');

const doDownload = require('node-download');

const config = require('config');

const scConfig = config.get('soundcloud');
const SC = require('node-soundcloud');
SC.init(scConfig);

class SoundCloudTrackStore {
  constructor(id) {
    this._id = id;

    this._meta = null;
    this._stream = null;
  }

  /**
   * /track/:id APIの戻り値
   */
  meta(callback){
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
  }

  /**
   * @return string stream url
   */
  stream(callback){
    if (this._stream) {
      callback(null,this._stream);
      return;
    }
    this.meta(function(err,track){
      if (err) {
        callback(err);
        return;
      }
      const streamMetaPath = track.stream_url;
      this._stream = streamMetaPath;

      callback(null, this._stream);
    }.bind(this));
  }

  /**
   * このSoundCloudの曲をoutputDirにダウンロードする
   * callback(err,destFilePath)
   */
  download(outputDir,callback){
    callback = callback || function(){};
    this.stream(function(err,stream){
      if (err) {
        callback(err);
        return;
      }

      const filename = this._createFileName(stream);
      const destFilePath = outputDir + '/' + filename;

      try {
        fs.statSync(destFilePath);
        callback(null,destFilePath);
      } catch(e) {
        doDownload(stream + '?client_id=' + scConfig.id, outputDir, filename, function(err){
          callback(err,destFilePath);
        });
      }
    }.bind(this));
  }

  _createFileName(stream){
    const ext = '.mp3';
    const filename = 'original'+ext;
    return filename;
  }
}

module.exports = SoundCloudTrackStore;
