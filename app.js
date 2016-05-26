"use strict";

// var synth = apiReader("data.js", "buzzFunk");

apiReader.loadPatch("data.js", "buzzFunk")


$(function() {


    $(".key").on("mouseover", function() {
        console.log($(this).index('.key'));
        var index = $(this).index('.key');

        apiReader.play(index);

    });


    $(".key").on("mouseout", function() {

        apiReader.stop();
    });



});