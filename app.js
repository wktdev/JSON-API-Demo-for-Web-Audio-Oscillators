"use strict";
$(function() {
    var audioContext = new AudioContext();
    var synthStop = undefined;
    var patchParams = undefined;

    function createSynth(arr, id) {

        var gainNodes = arr.map(function(val, index, arr) {

            var gain = audioContext.createGain();
            gain.gain.value = val.volume;
            return gain

        });

        var synth = arr.map(function(val, index, arr) {

            var osc = audioContext.createOscillator();
            osc.connect(gainNodes[index])
            gainNodes[index].connect(audioContext.destination)
            osc.type = val.type;
            osc.frequency.value = val.frequency;
            osc.detune.value = (val.frequency) + (id * 100);
            osc.start(audioContext.currentime);


            return osc;
        });



        return function stop() {

            for (var i = 0; i < synth.length; i += 1) {

                synth[i].stop(audioContext.currentTime)
            }
        }

    }



    $.getJSON("data.js", function(data) {

    }).done(function(data) {

        patchParams = data.jazzFunk;

    });

    for (var i = 0; i <= 24; i += 1) {

        $(".keys").append("<li class='key'id='" + i + "'</li>")
    }


    $(".key").on("mouseover", function() {

        var id = this.id;
        synthStop = createSynth(patchParams, id);

    })

    $(".key").on("mouseout", function() {

        synthStop()

    })
})