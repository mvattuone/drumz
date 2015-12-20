var HiHat = new Tone.Sampler("./src/audio/drumtrax/DrumtraxClosedhat-24b.wav", {
    "volume" : -10,
    "envelope" : {
        "attack" : 0.001,
        "decay" : 0.02,
        "sustain" : 0.01,
        "release" : 0.01
    },
    "filterEnvelope" : {
        "attack" : 0.001,
        "decay" : 0.02,
        "sustain" : 1,
        "baseFrequency" : 6000,
        "octaves" : -3.3
    },
    "filter" : {
        "type" : "highpass"
    }
}).toMaster();

module.exports = HiHat;
