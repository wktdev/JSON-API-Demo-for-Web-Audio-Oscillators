"use strict";
var audioContext = new AudioContext();

var apiReader = function() {
    'use strict';

    var app = {

        synth: undefined,
        patchParams: undefined,
        gainNodes: undefined,
        oscillators: undefined,

        getAPIData: function(directory, patchName) {
            $.getJSON(directory, function(data) {

            }).done(function(data) {

                app.patchParams = data[patchName];


            });

        },


        play: function() {




            app.gainNodes = app.patchParams.map(function(val, index, arr) {

                var gain = audioContext.createGain();
                gain.gain.value = val.volume;
                return gain

            });

            app.oscillators = app.patchParams.map(function(val, index, arr) {

                var osc = audioContext.createOscillator();
                osc.type = val.type;
                osc.frequency.value = val.frequency;
                // osc.detune.value = (val.frequency) + (id * 100);


                return osc;
            });
            for (var i = 0; i < app.oscillators.length; i += 1) {
                app.oscillators[i].connect(app.gainNodes[i]);
                app.gainNodes[i].connect(audioContext.destination);
                app.oscillators[i].start(audioContext.currentTime)
            }
        },

        stop: function() {
            for (var i = 0; i < app.oscillators.length; i += 1) {
                app.oscillators[i].connect(app.gainNodes[i]);
                app.gainNodes[i].connect(audioContext.destination);
                app.oscillators[i].stop(audioContext.currentTime)
            }
        },
    };

    return app;
};

var synth = apiReader();
synth.getAPIData("data.js", "jazzFunk");

$(function() {

    $("div").on("mousedown", function() {

        synth.play()

    }).on("mouseup", function() {
        synth.stop()
    })
})