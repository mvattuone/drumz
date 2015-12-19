## STRUCTURE ##

### DEPENDENCIES ###

Drumz requires a few dependencies:

* jQuery (for syntactic sugar fun time)
* React (for amazingly fast UI updates and data agnostic component-based view architecture -- buzzwords much?)
* ToneJS (amazing library by Yotam Mann that helps abstract a good deal of the Web Audio API and feels very familiar to users of Max/MSP)
* Gulp (makes builds easier)
* Babel (JSX for React, maybe ES6 one of these days)

### COMPONENTS ###

Drumz is comprised of a number of components, and attempts to keep things 
modularized based on the component that requires it.

At the top level exists an app module, which contains all of our top-level
dependencies, i.e. things that we will want to have access to from our 
components from top to bottom, as well as the initial call to ReactDOM.

The ReactDOM instantiates a DrumMachine. A DrumMachine consists of a few keys parts.

DrumMachine
== DrumTrack
==== DrumBeat

Note that a DrumMachine can have many DrumTracks, and a DrumTrack can have many DrumBeats.

Currently, you can only select a few pre-selected sounds -- this is because the main focus
is on foundations rather than quality. If you want quality, you should probably be using
Ableton right now, you know what I mean? Use this to demo or sketch. We will eventually
add the ability to include your own samples and probably attach effects.

### TIMING ###

Since there is only one Transport available at any given time, we have to think about each
individual track relative to a global timeline. If you were using Ableton, you could 
imagine each of this tracks as being a scene that has a particular time signature, w/
an already include Impulse and an intuitive interface that visualizes the life-cycle of 
each rhythm in comparison to the other ones.

TODO: We need to indicate WHERE in the gosh darn DrumTrack which DrumBeat is currently 
being triggered!


## IDEAS ##

### MEASURES ###

Since we have created components, we can think about things in a higher level pretty 
easily. Now that we have base components, are there ways that we can _re-use_ the 
components to produce interesting features? In this case, hell yeah! We can make
measures.

Measures indicate how many groups of notes at a time signature (or time signatures)
should be played. So if you're playing a song in 4/4 that has a riff of 4 quarter notes
that is repeated three times, you are playing three measures. These are also known as 
bars.

In tech speak, measures should simply be correspond to the number of times we 
want to have a track repeat. What's cool about this is that we could theoretically
cache all of the possible "DrumTracks and allow people to move them around really
easily"

This would cause us to have to rethink the architecture of our DrumMachine a bit, but not much:

DrumMachine
== DrumTrackList
==== DrumTrack
  ==== DrumBeat

I want it to be clear that the DrumBeat component is a component in and of itself, but really
only has one owner -- the DrumTrack. The DrumTrackList component is a wrapper that counts the
number of DrumTracks to include, based on a user input. This would be the number of measures.

Note that a DrumMachine can have many DrumTracks, and a DrumTrack can have many DrumBeats

### STATE ###

How do we make it possible to save instances of music created without having to store mp3s?
One way to do this is by creating a representation of a track in a simple data structure:

e.g. url?track=1&drum=k&seq=10010&type=8&track=1&drum=k&seq=10010&type=16

Something like that, which we would then use when the page is loading to bring up an 
instance of the drum machine with each track featuring the correct instrument, sequence,
and time signature.

We could even use a URL shortner so that people don't have to look at this stuff... maybe?
