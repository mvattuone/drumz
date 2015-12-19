// The main machine module. Contains all tracks, which 
// subsequently contain all beats.

DrumTrack = require('../components/drum-track');

var DrumMachine = React.createClass({

  // We get one track to start so users aren't like "huh"?
  getInitialState: function() { 
    return { trackCount: this.props.initialTrackCount }
  },

  // On click, we increase the number of tracks.
  handleClick: function() {
    this.setState({trackCount: this.state.trackCount + 1});
  },
  
  render: function() {
    var tracks = [],
        trackCount = this.state.trackCount;

    for (i=0; i<trackCount; i++) {
      tracks.push(<DrumTrack key={i} initialBeatType={4} initialBeatCount={4} />);
    };

    Tone.Transport.start();

    return (
      <div className="drummachine">
        <ul className="drummachine__list">
          {tracks}
        </ul>
        <div className="drummachine__controls">
          <button onClick={this.handleClick}>Add Track</button>
        </div>
      </div>
    )
  }
});

module.exports = DrumMachine;