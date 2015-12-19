// Top level app file. Because it's the way we always do things, damnit!

React = require('react');
ReactDOM = require('react-dom');
$ = require('jquery');
Tone = require('tone');
DrumMachine = require('./components/drum-machine');

// Kick it!

ReactDOM.render(
  <DrumMachine initialTrackCount={1} initialBPM={120} />,
  $('#application')[0]
);







