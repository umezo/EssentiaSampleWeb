const BeatMarkTrack = require('./BeatMarkTrack');
const React = require('react');
const ReactDOM = require('react-dom');

const request = require('superagent');


const targets = document.querySelectorAll('.track-beat-mark-track');

for(let target,i=0,n=targets.length ; i<n ; i++ ){
  initiateBeatTrack(targets[i]);
}


function initiateBeatTrack(target){
  const stream = target.getAttribute('data-state-stream');
  const beats = target.getAttribute('data-state-beats');
  request
    .get(beats)
    .set('Accept', 'application/json')
    .end(function(err,res){
      res = JSON.parse(res.text);
      ReactDOM.render(( <BeatMarkTrack stream={stream} beats={res} />), target);
    });
}
