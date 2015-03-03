/** @jsx React.DOM */
var BeatMarkTrack = require('./BeatMarkTrack');
var React = require('react');

var request = require('superagent');


var targets = document.querySelectorAll('.track-beat-mark-track');

for(var target,i=0,n=targets.length ; i<n ; i++ ){
  initiateBeatTrack(targets[i]);
}


function initiateBeatTrack(target){
  var stream = target.getAttribute('data-state-stream');
  var beats = target.getAttribute('data-state-beats');
  request
    .get(beats)
    .set('Accept', 'application/json')
    .end(function(err,res){
      res = JSON.parse(res.text);
      var beatTrack = React.render(( <BeatMarkTrack stream={stream} beats={res} />), target);
    });
}
