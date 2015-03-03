/** @jsx React.DOM */
var React = require('react');
var BeatEmitter = require('beat-emitter.js').BeatEmitter;
var BeatPopElement = require('./BeatPopElement');

var FPS = 24;
var SPF = 1000/FPS;

var BeatMarkTrack = React.createClass({
  /**
   * @override
   */
  getInitialState: function () {
    return {beat:false};
  },

  //beat検知系
  onBeat: function(e){
    this.refs.pop.setState({beat:true});
    setTimeout(this.offBeat,SPF*2);
  },
  offBeat: function(e){
    this.refs.pop.setState({beat:false});
  },
  onTimer: function(){
    var audio = this.refs.audio.getDOMNode();
    this.beatEmitter.tickAt(audio.currentTime);
  },
  stopTimer: function(){
    if (!this._intervalId) {
      return;
    }
    clearInterval(this._intervalId);
    this._intervalId = null;
  },

  //audio タグ関連
  onPlay: function(e){
    this._intervalId = setInterval(this.onTimer,SPF);
    this.beatEmitter.reset();
  },
  onPause: function(e){
    this.stopTimer();
  },
  onEnded: function(e){
    this.stopTimer();
  },

  /**
   * @override
   */
  componentDidMount: function() {
    var audioElem = this.refs.audio.getDOMNode();
    audioElem.addEventListener('play' ,this.onPlay,false);
    audioElem.addEventListener('ended',this.onEnded,false);
    audioElem.addEventListener('pause',this.onPause,false);

    this.beatEmitter = new BeatEmitter(this.props.beats);
    this.beatEmitter.on('beat',this.onBeat);
  },
  /**
   * @override
   */
  componentWillUnmount: function() {
    var audioElem = this.refs.audio.getDOMNode();
    audioElem.removeEventListener('play' ,this.onPlay,false);
    audioElem.removeEventListener('ended',this.onEnded,false);
    audioElem.removeEventListener('pause',this.onPause,false);

    this.stopTimer();

    this.beatEmitter.off('beat',this.onBeat);
    this.beatEmitter = null;
  },
  /**
   * @override
   */
  render: function() {
    return  (
      <div className="beat-mark-track-container">
        <div className="beat-visualization">
          <BeatPopElement src="/img/tv.gif" alt="" beat={this.state.beat} ref='pop'/>
        </div>
        <audio ref="audio" onTimeupdate={this.onTimeupdate} className="beat-mark-player" src={this.props.stream} preload='none' controls></audio>
      </div>
    );
  }
});

module.exports = BeatMarkTrack;
