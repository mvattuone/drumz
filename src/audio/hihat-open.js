var HiHatOpen = new Tone.Sampler("./src/audio/drumtrax/DrumtraxOpenhat-24b.wav", {
    "volume" : -7,
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

module.exports = HiHatOpen;

