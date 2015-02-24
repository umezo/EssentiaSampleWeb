var fs = require('fs');
var doExec = require('../lib/spawn-util');

var SOUNDS_DIR = __dirname+'/../sounds';

function LocalTrack(trackId){
  this.id = trackId;
}

LocalTrack.prototype.getDir = function(){
  return SOUNDS_DIR+'/'+this.id;
};

LocalTrack.prototype.getFileName = function(){
  return 'original.' + this.id + '.mp3';
};

LocalTrack.prototype.getFilePath = function(){
  return this.getDir()+'/'+this.getFileName();
};

LocalTrack.prototype.exists = function(){
  try {
    fs.statSync(this.getDir());
    return true;
  } catch(e) {
    return false;
  }
};

LocalTrack.prototype.beats = function(callback){
  if (this.hasBeats()) {
    callback(null,require(this.beatsFile()));
    return;
  }

  this.createBeats(callback);
};

LocalTrack.prototype.beatsFile = function(){
  return this.getDir()+'/beats.json';
};

LocalTrack.prototype.beatsSound = function(){
  return this.getDir()+'/beats.mp3';
};

LocalTrack.prototype.hasBeats = function(){
  try {
    fs.statSync(this.beatsFile());
    return true;
  } catch(e) {
    return false;
  }
};

LocalTrack.prototype.createBeats = function(callback){
  doExec('python',[__dirname+'/../batch/beats.py',this.getFilePath(),this.beatsSound(),this.beatsFile()],function(err,stdout,stderr){
    if (err) {
      callback({err:err,stdout:stdout,stderr:stderr});
      return;
    }
    callback(null,require(this.beatsFile()));
  }.bind(this));
};

module.exports = LocalTrack;
