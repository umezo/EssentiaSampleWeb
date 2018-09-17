const React = require('react');
class BeatPopElement extends React.Component {
  getInitialState () {
    return {beat:false};
  }

  render() {
    return (
      <img className={"beat-visualization-icon "+(this.state.beat?'beat ':' ')+(this.state.isPlaying?'playing':'')} src={this.props.src} alt={this.props.alt}/>
    );
  }
};

module.exports = BeatPopElement;
