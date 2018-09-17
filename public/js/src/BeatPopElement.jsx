const React = require('react');
const BeatPopElement = function (props) {
  return (
    <img className={"beat-visualization-icon "+(props.beat?'beat ':' ')+(props.isPlaying?'playing':'')} src={props.src} alt={props.alt}/>
  );
};

module.exports = BeatPopElement;
