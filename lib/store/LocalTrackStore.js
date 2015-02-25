var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;


var BeatMaker = require('./localTrackStore/BeatMaker');

function LocalTrackStore(soundFilePath,dir) {
  this._path = soundFilePath;
  this._dir = dir||path.dirname(soundFilePath);
}

inherits(LocalTrackStore,EventEmitter);

_.assign(LocalTrackStore.prototype,{
  initialize: function(){
    this.createBeats(function(err){
      if (err) {
        this.emit('error',err);
        return;
      }

      this.emit('initialize');
    }.bind(this));
  },
  dir: function(){
    return this._dir;
  },
  _exists :function(){
    try {
      fs.statSync(this._beatsFilePath());
      fs.statSync(this._beatsMarkedSoundFilePath());
      return true;
    } catch(e) {
      return false;
    }
  },

  beats :function(){
    try{
      return require(this._beatsFilePath());
    } catch(e) {
      return null;
    }
  },

  _beatsFilePath :function(){
    return this.dir()+'/beats.json';
  },
  
  _beatsMarkedSoundFilePath: function(){
    return this.dir()+'/beats.mp3';
  },

  createBeats :function(callback){
    var beats = this.beats();
    if (beats) {
      callback(null,beats);
      return;
    }
    
    BeatMaker(this._path, this._beatsMarkedSoundFilePath(), this._beatsFilePath(), function(err){
      callback(err,this.beats());
    }.bind(this));
  }
});

module.exports = LocalTrackStore;
