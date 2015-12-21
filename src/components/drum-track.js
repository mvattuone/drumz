DrumBeat = require('../components/drum-beat');
Kick = require('../audio/kick');
Snare = require('../audio/snare');
HiHat = require('../audio/hihat');
HiHatOpen = require('../audio/hihat-open');


var DrumTrack = React.createClass({

  // We pass in an initial time signature of 4/4 to component state 
  // via initialization props.
  getInitialState: function() {  
    var beatMap = [];
    return {
      beatCount: this.props.initialBeatCount,
      beatType: this.props.initialBeatType,
      beatMap: beatMap.fill(this.props.initialBeatCount,null),
      drum: Kick
    };
  },

  // Kick off the first loop outside right after getInitialState
  componentDidMount: function() {
    this._renderTrack();
  },

  // When the time signature in a track changes, 
  // make sure we update the state so we can re-render
  // the proper number of beats.
  handleChange: function(event) {

    // Stop and remove the loop if it exists, we'll start it up again soon.
    if (this.loop !== undefined) {
      this.loop.stop();
      this.loop.dispose();
    }

    // Route our event to the proper method
    switch (event.target.name) {
      case 'drum':
        this._toggleDrum(event);
        break;
      case 'beatCount':
        this._toggleBeatCount(event);      
        break;
      case 'beatType':
        this._toggleBeatType(event);
        break;
      default:
    throw Error("Must supply a valid parameter to change! Choices include node, beatCount, and beatType.");
    }
  },

  handleChildToggle: function(index, isActive) {
    // Create a clone of the existing beat map
    var updatedBeatMap = this.state.beatMap.slice(),
    self = this;
    
    // update beat map to reflect active toggle
    updatedBeatMap[index] = isActive ? "active" : null;
    this.setState({ beatMap: updatedBeatMap });
  },

  _toggleBeatType: function(event) {
    this.setState({ beatType: event.target.value }, function() {
      this._renderTrack();
    });
  },

  _toggleBeatCount: function(event) {
    this.setState({ beatCount: event.target.value }, function() {
      this._renderTrack()
    });
  },

  _toggleDrum: function(event) {
    var drum;

    switch (event.target.value) {
      case 'k':
        drum = Kick;
        break;
      case 'hh':
        drum = HiHat;
        break;
      case 'hho':
        drum = HiHatOpen;
        break;
      case 's':
        drum = Snare;
        break;
      default:
        throw Error("You need to provide a valid drum")
    }

    this.setState({ drum: drum }, function() {
      this._renderTrack();
    });
  },

  // Create a sequence of beats that map to the currently active
  // triggers for the drum track. We play these at the rate of 
  // the given beat type for the duration of the number of beats.
  // Hence, we create one measure.

  // TODO: How could we create more than one measure?

  _createSequence: function(beats) {
    var self = this;
    return new Tone.Sequence(function(time, index) {
      if (self.state.beatMap[index] === "active") {
        self.state.drum.triggerAttackRelease(0, "4n", time);
      }
    }, beats, this.state.beatType + "n");
  },


  // Kick off our drum track

  _renderTrack: function() {

    // Create total beats to sequence
    var beats = [];
    for (var i = 0; i < this.state.beatCount; i++) {
      beats.push(i);
    }

    // Create sequence
    this.loop = this._createSequence(beats);

    window.loop = this.loop;
    
    // Start sequence, ensure tracks are synchronized
    this.loop.start(0);
  },

  // Create the appropriate number of beats based on the time signature
  // we have currently set in the state.
  render: function() {
    var beatCount = this.state.beatCount;
    var beatType = this.state.beatType;
    var beats = [];

    for (i=0; i<beatCount; i++) {
      beats.push(<DrumBeat key={i} index={i} beatType={beatType} beatCount={beatCount} onToggle={this.handleChildToggle} />);
    }

    return (
      <li>
        <form className="drumtrack__controls">
          
          <label htmlFor="drum">
            Drum Sound
            <select name="drum" onChange={this.handleChange}>
              <option value="k">Kick</option>
              <option value="s">Snare</option>
              <option value="hh">Hi Hat</option>
              <option value="hho">Open Hi Hat</option>
            </select>
          </label>

          <label htmlFor="beatCount">
            Beat Count
            <input type="number"  min="1" max="64" name="beatCount" value={beatCount} onChange={this.handleChange} />
          </label>

          <label htmlFor="beatType">
            Beat Type
            <select name="beatType" onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </select>
          </label>

          <div className="drumtrack__controls__timesig">
            <sup className="beatCount">{beatCount}</sup>&frasl;<sub className="beatType">{beatType}</sub>
          </div>
        </form>
      
        <ul className="drumtrack__drumbeats">
          {beats}
        </ul>
      </li>
      )
  }
});

module.exports = DrumTrack;