"use strict";
var audioContext = new AudioContext();

var apiReader = function(a, b) {


    function getAPIData(directory, patchName) {

        $(function() {

            $.getJSON(directory, function() {


            }).done(function(data) {

                app.patchParams = data[patchName];


            });

        });

    }

    getAPIData(a, b);

    var app = {

        patchParams: undefined,
        gainNodes: undefined,
        oscillators: undefined,


        play: function(id) {

            app.gainNodes = app.patchParams.map(function(val) {

                var gain = audioContext.createGain();
                gain.gain.value = val.volume;
                return gain;

            });

            app.oscillators = app.patchParams.map(function(val) {

                var osc = audioContext.createOscillator();
                osc.type = val.type;
                osc.frequency.value = val.frequency;
                osc.detune.value = (val.frequency) + (id * 100);


                return osc;
            });
            for (var i = 0; i < app.oscillators.length; i += 1) {
                app.oscillators[i].connect(app.gainNodes[i]);
                app.gainNodes[i].connect(audioContext.destination);
                app.oscillators[i].start(audioContext.currentTime);
            }
        },

        stop: function() {
            for (var i = 0; i < app.oscillators.length; i += 1) {
                app.oscillators[i].connect(app.gainNodes[i]);
                app.gainNodes[i].connect(audioContext.destination);
                app.oscillators[i].stop(audioContext.currentTime);
            }
        }

    }




    return app

};