const fs = require('fs');
const path = require('path');
const EventEmitter = require('events').EventEmitter;

const BeatMaker = require('./localTrackStore/BeatMaker');

class LocalTrackStore extends EventEmitter {
  constructor(soundFilePath,dir) {
    super();
    this._path = soundFilePath;
    this._dir = dir||path.dirname(soundFilePath);
  }

  initialize(){
    this.createBeats(function(err){
      if (err) {
        this.emit('error',err);
        return;
      }

      this.emit('initialize',this);
    }.bind(this));
  }

  dir(){
    return this._dir;
  }

  _exists(){
    try {
      fs.statSync(this._beatsFilePath());
      fs.statSync(this._beatsMarkedSoundFilePath());
      return true;
    } catch(e) {
      return false;
    }
  }

  beats(){
    try{
      return require(this._beatsFilePath());
    } catch(e) {
      return null;
    }
  }

  _beatsFilePath(){
    return this.dir()+'/beats.json';
  }
  
  _beatsMarkedSoundFilePath(){
    return this.dir()+'/beats.mp3';
  }

  createBeats(callback){
    const beats = this.beats();
    if (beats) {
      callback(null,beats);
      return;
    }
    
    BeatMaker(this._path, this._beatsMarkedSoundFilePath(), this._beatsFilePath(), function(err){
      callback(err,this.beats());
    }.bind(this));
  }
}

module.exports = LocalTrackStore;
