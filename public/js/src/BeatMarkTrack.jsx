const React = require('react');
const BeatEmitter = require('beat-emitter.js').BeatEmitter;
const BeatPopElement = require('./BeatPopElement');

const FPS = 24;
const SPF = 1000/FPS;

class BeatMarkTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beat: false,
      isPlaying: false,
    };
  }

  //beat検知系
  onBeat(e){
    this.setState({beat:true});
    setTimeout(this.offBeat,SPF*2);
  }
  offBeat(e){
    this.setState({beat:false});
  }
  onTimer(){
    const audio = this.refs.audio;
    this.beatEmitter.tickAt(audio.currentTime);
  }
  stopTimer(){
    this.setState({isPlaying:false});
    if (!this._intervalId) {
      return;
    }
    clearInterval(this._intervalId);
    this._intervalId = null;
  }

  //audio タグ関連
  onPlay(e){
    this._intervalId = setInterval(this.onTimer,SPF);
    this.beatEmitter.reset();
    this.setState({isPlaying:true});
  }
  onPause(e){
    this.stopTimer();
  }
  onEnded(e){
    this.stopTimer();
  }

  /**
   * @override
   */
  componentDidMount() {
    const audioElem = this.refs.audio;
    audioElem.addEventListener('play' ,this.onPlay,false);
    audioElem.addEventListener('ended',this.onEnded,false);
    audioElem.addEventListener('pause',this.onPause,false);

    this.beatEmitter = new BeatEmitter(this.props.beats);
    this.beatEmitter.on('beat',this.onBeat);
  }
  /**
   * @override
   */
  componentWillUnmount() {
    const audioElem = this.refs.audio;
    audioElem.removeEventListener('play' ,this.onPlay,false);
    audioElem.removeEventListener('ended',this.onEnded,false);
    audioElem.removeEventListener('pause',this.onPause,false);

    this.stopTimer();

    this.beatEmitter.off('beat',this.onBeat);
    this.beatEmitter = null;
  }
  /**
   * @override
   */
  render() {
    return  (
      <div className="beat-mark-track-container">
        <div className="beat-visualization">
          <BeatPopElement beat={this.state.beat} isPlaying={this.state.isPlaying} src="/img/tv.gif" alt="" ref='pop'/>
        </div>
        <audio ref="audio" onTimeupdate={this.onTimeupdate} className="beat-mark-player" src={this.props.stream} preload="none" controls />
      </div>
    );
  }
};

module.exports = BeatMarkTrack;
