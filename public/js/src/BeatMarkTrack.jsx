const React = require('react');
const BeatEmitter = require('beat-emitter.js').BeatEmitter;
const BeatPopElement = require('./BeatPopElement');

const FPS = 24;
const SPF = 1000/FPS;

const BeatMarkTrack = React.createClass({
  /**
   * @override
   */
  getInitialState: function () {
    return {
      beat:false,
      isPlaying:false
    };
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
    const audio = this.refs.audio;
    this.beatEmitter.tickAt(audio.currentTime);
  },
  stopTimer: function(){
    this.refs.pop.setState({isPlaying:false});
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
    this.refs.pop.setState({isPlaying:true});
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
    const audioElem = this.refs.audio;
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
    const audioElem = this.refs.audio;
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
          <BeatPopElement src="/img/tv.gif" alt="" ref='pop'/>
        </div>
        <audio ref="audio" onTimeupdate={this.onTimeupdate} className="beat-mark-player" src={this.props.stream} preload="none" controls></audio>
      </div>
    );
  }
});

module.exports = BeatMarkTrack;
