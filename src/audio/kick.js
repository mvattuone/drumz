var Kick = new Tone.DrumSynth({
    "volume": 8,
    "pitchDecay" : 0.01,
    "octaves" : 6,
    "oscillator" : {
        "type" : "square4"
    },
    "envelope" : {
        "attack" : 0.012,
        "decay" : 0.3,
        "sustain" : 0.1
    }
}).toMaster();

module.exports = Kick;
