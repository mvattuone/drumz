var Crash = new Tone.Sampler("./src/audio/drumtrax/DrumtraxCrash-24b.wav", {
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

module.exports = Crash;
