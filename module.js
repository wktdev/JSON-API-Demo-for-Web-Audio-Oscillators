"use strict";
var audioContext = new AudioContext();

var apiReader = (function() {

    var patchParams = undefined,
        gainNodes = undefined,
        oscillators = undefined;


    function play(id) {

        gainNodes = patchParams.map(function(val) {

            var gain = audioContext.createGain();
            gain.gain.value = val.volume;
            return gain;

        });

        oscillators = patchParams.map(function(val) {

            var osc = audioContext.createOscillator();
            osc.type = val.type;
            osc.frequency.value = val.frequency;
            osc.detune.value = (val.frequency) + (id * 100);


            return osc;
        });
        for (var i = 0; i < oscillators.length; i += 1) {
            oscillators[i].connect(gainNodes[i]);
            gainNodes[i].connect(audioContext.destination);
            oscillators[i].start(audioContext.currentTime);
        }
    }

    function stop() {
        for (var i = 0; i < oscillators.length; i += 1) {
            oscillators[i].connect(gainNodes[i]);
            gainNodes[i].connect(audioContext.destination);
            oscillators[i].stop(audioContext.currentTime);
        }
    }



    function getAPIData(directory, patchName) {

        $(function() {

            $.getJSON(directory, function() {


            }).done(function(data) {

                patchParams = data[patchName];


            });

        });

    }



    return {
        loadPatch: getAPIData,
        play: play,
        stop: stop

    };

}());