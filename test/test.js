var LocalTrack = require('./lib/LocalTrack');

var lt = new LocalTrack(192747156);
console.log('exists', lt.exists()?'o':'x');
console.log('hasBeats', lt.hasBeats()?'o':'x');
console.log('beatsFile', lt.beatsFile());
console.log('beatsSound', lt.beatsSound());

lt.beats(function(err,beats){
  console.log(err);
  console.log(beats);
});
