var DrumBeat = React.createClass({

  getInitialState: function() { 
    return { 
      isActive: false
    }
  },

  // We're passing the change of state in the child component to the parent
  // component via a callback, invoked after setState is executed.

  onToggle: function() {
    var self = this;
    this.setState({ isActive: !this.state.isActive}, function() {
      this.props.onToggle(self.props.index, self.state.isActive);
    });
  },

  render: function() {
    var classes = "drumtrack__drumbeats__drumbeat drumtrack__drumbeats__drumbeat--" + this.props.beatType  + " " + (this.state.isActive ? "drumtrack__drumbeats__drumbeat--active" : "");
    return (
      <div onClick={this.onToggle} className={classes} />
    )
  }

});

module.exports = DrumBeat;