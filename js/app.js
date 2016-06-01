"use strict";

// var synth = apiReader("data.js", "buzzFunk");

var synth = apiReader("js/data.js", "buzzFunk")


$(function() {


    $(".key").on("mouseover", function() {
        console.log($(this).index('.key'));
        var index = $(this).index('.key');

        synth.play(index);

    });


    $(".key").on("mouseout", function() {

        synth.stop();
    });



});