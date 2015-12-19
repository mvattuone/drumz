var Kick = new Tone.DrumSynth({
    "pitchDecay" : 0.01,
    "octaves" : 6,
    "oscillator" : {
        "type" : "square4"
    },
    "envelope" : {
        "attack" : 0.001,
        "decay" : 0.2,
        "sustain" : 0
    }
}).toMaster();

module.exports = Kick;
