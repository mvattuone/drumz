_ = require('lodash');
DrumBeat = require('../components/drum-beat');
Cabasa = require('../audio/cabasa');
Cowbell = require('../audio/cowbell');
Clap = require('../audio/clap');
Crash = require('../audio/crash');
HiHat = require('../audio/hihat');
HiHatOpen = require('../audio/hihat-open');
Kick = require('../audio/kick');
Ride = require('../audio/ride');
Rimshot = require('../audio/rimshot');
Snare = require('../audio/snare');
Tambourine = require('../audio/tambourine');
Tom1 = require('../audio/tom-1');
Tom2 = require('../audio/tom-2');

var DrumTrack = React.createClass({

  // We pass in an initial time signature of 4/4 to component state
  // via initialization props.
  getInitialState: function() {
    var beatMap = [];
    return {
      beatCount: this.props.initialBeatCount,
      beatType: this.props.initialBeatType,
      beatMap: _.fill(beatMap, this.props.initialBeatCount,null),
      drum: Cabasa
    };
  },

  // Kick off the first sequence outside right after getInitialState
  componentDidMount: function() {
    this._renderTrack();
  },

  // When the time signature in a track changes,
  // make sure we update the state so we can re-render
  // the proper number of beats.
  handleChange: function(event) {
    this._toggle(event.target.name, event.target.value);
  },

  handleChildToggle: function(index, isActive) {
    // Create a clone of the existing beat map
    var updatedBeatMap = this.state.beatMap.slice(),
    self = this;

    // update beat map to reflect active toggle
    updatedBeatMap[index] = isActive ? "active" : null;
    this.setState({ beatMap: updatedBeatMap });
  },

  _getSound: function(soundKey) {
    switch (soundKey) {
      case 'k':
        sound = Kick;
        break;
      case 'hh':
        sound = HiHat;
        break;
      case 'hho':
        sound = HiHatOpen;
        break;
      case 's':
        sound = Snare;
        break;
      case 't1':
        sound = Tom1;
        break;
      case 't2':
        sound = Tom2;
        break;
      case 'tm':
        sound = Tambourine;
        break;
      case 'ca':
        sound = Cabasa;
        break;
      case 'cl':
        sound = Clap;
        break;
      case 'cb':
        sound = Cowbell;
        break;
      case 'cr':
        sound = Crash;
        break;
      case 'rs':
        sound = Rimshot;
        break;
      case 'rd':
        sound = Ride;
        break;
      default:
        throw Error("You need to provide a valid sound key!")
    }

    return sound;
  },


  _toggle: function(type, value) {
    if (type === 'drum') {
      value = this._getSound(value);
    }

    var newState = {};

    newState[type] = value;

    this.setState(newState, this._renderTrack);
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

    // Stop the existing loop
    if (this.sequence !== undefined) {
      this.sequence.stop();
    }

    // Create total beats to sequence
    var beats = [];
    for (var i = 0; i < this.state.beatCount; i++) {
      beats.push(i);
    }

    // Create new sequence
    this.sequence = this._createSequence(beats);

    // Start sequence, ensure tracks are synchronized by starting them all
    // from the beginning
    this.sequence.start(0);
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
              <option value="ca">Cabasa</option>
              <option value="k">Kick</option>
              <option value="s">Snare</option>
              <option value="hh">Hi Hat</option>
              <option value="hho">Open Hi Hat</option>
              <option value="cl">Clap</option>
              <option value="cr">Crash</option>
              <option value="cb">Cowbell</option>
              <option value="rd">Ride</option>
              <option value="rs">Rimshot</option>
              <option value="tm">Tambourine</option>
              <option value="t1">Tom 1</option>
              <option value="t2">Tom 2</option>
            </select>
          </label>

          <label htmlFor="beatCount">
            Beat Count
            <input type="number" min="1" max="64" name="beatCount" value={beatCount} onChange={this.handleChange} />
          </label>

          <label htmlFor="beatType">
            Beat Type
            <select name="beatType" defaultValue="4" onChange={this.handleChange}>
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
