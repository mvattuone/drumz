var Snare = new Tone.Sampler("./src/audio/drums/snare.mp3", {
    "envelope" : {
        "attack" : 0.01,
        "decay" : 0.05,
        "sustain" : 0
    },
    "filterEnvelope" : {
        "attack" : 0.001,
        "decay" : 0.01,
        "sustain" : 0,
        "baseFrequency" : 3000,
        "octaves" : 2
    },
}).toMaster();

module.exports = Snare;
