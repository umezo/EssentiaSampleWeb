const React = require('react');
class BeatPopElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beat: false,
      isPlaying: false
    };
  }

  render() {
    return (
      <img className={"beat-visualization-icon "+(this.state.beat?'beat ':' ')+(this.state.isPlaying?'playing':'')} src={this.props.src} alt={this.props.alt}/>
    );
  }
};

module.exports = BeatPopElement;
