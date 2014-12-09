/**
 * Created by Wouter on 22/11/14.
 */

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

