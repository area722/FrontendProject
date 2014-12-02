/**
 * Created by Wouter on 22/11/14.
 */

(function getLocation() {
    var pos = {coords:{latitude:21.344507,longitude:-157.974891}};
    var nav = null;
    if (nav == null) {
        nav = window.navigator;
    }
    if (nav != null) {
        var geoloc = nav.geolocation;
        if (geoloc != null) {
            geoloc.getCurrentPosition(showPosition, error);
        }
        else {
            initialize(pos);
            console.log("Geolocation not supported");
        }
    }
    else {
        console.log("Navigator not found");
    }

    function showPosition(pos){
        initialize(pos);
    }
    function error(error){
        var message = "";
        // Check for known errors
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = "This website does not have permission to use " +
                "the Geolocation API";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "The current position could not be determined.";
                break;
            case error.PERMISSION_DENIED_TIMEOUT:
                message = "The current position could not be determined " +
                "within the specified timeout period.";
                break;
        }
        // If it's an unknown error, build a message that includes
        // information that helps identify the situation, so that
        // the error handler can be updated.
        if (message == "")
        {
            var strErrorCode = error.code.toString();
            message = "The position could not be determined due to " +
            "an unknown error (Code: " + strErrorCode + ").";
        }
        console.log(message);
        initialize(pos);
    }
})();

var posGlobal;
var mapGlobal;
function initialize(pos) {
    posGlobal = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var mapOptions = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        zoom: 18,
        center: posGlobal,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    mapGlobal = map;
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'scroll', function() {
    google.maps.event.trigger(mapGlobal, "resize");
    mapGlobal.setCenter(posGlobal);
});