/**
 * Created by Wouter on 22/11/14.
 */
var socket = io.connect();
skrollr.init({
    smoothScrolling: false,
    mobileDeceleration: 0.004
});

$(document).ready(init);
function init(){
    "use strict";
    new QueryLoader2(document.querySelector("body"), {
        barColor: "#ffffff",
        backgroundColor: "#2e2e2f",
        percentage: true,
        barHeight: 4,
        minimumTime: 2500,
        fadeOutTime: 700
    });
}

var toStringFnc = ({}).toString;
Modernizr.addTest('svgforeignobject', function() {
    return !!document.createElementNS &&
        /SVGForeignObject/.test(toStringFnc.call(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')));
});

if (!Modernizr.svgforeignobject){
    $("#snakePlay").remove();
    $("#playPic").remove();
    $("#pictionaryDiv").remove();
    $("#chat svg").remove();
    $("#chat").addClass("chat-no");
}