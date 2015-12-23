var Snare = new Tone.Sampler("./src/audio/drumtrax/DrumtraxSnare-24b.wav", {
    "volume": 30
}).toMaster();

module.exports = Snare;
