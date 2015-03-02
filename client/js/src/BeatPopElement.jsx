/** @jsx React.DOM */
var React = require('react');
var BeatPopElement = React.createClass({
  getInitialState: function () {
    return {beat:false};
  },
  render: function() {
    return (
      <img className={"beat-visualization-icon "+(this.state.beat?'beat':'')} src={this.props.src} alt={this.props.alt}/>
    );
  }
});

module.exports = BeatPopElement;
