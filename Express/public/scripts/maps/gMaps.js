/**
 * Created by Wouter on 22/11/14.
 */

var posGlobal;
(function getLocation() {
    var pos,nav = null;
    if (nav === null) {
        nav = window.navigator;
    }
    if (nav !== null) {
        var geoloc = nav.geolocation;
        if (geoloc !== null) {
            geoloc.getCurrentPosition(showPosition, error);
        }
        else {
            console.log("Geolocation not supported");
        }
    }
    else {
        console.log("Navigator not found");
    }

    function showPosition(pos){
        initialize(pos);
        console.log(pos);
    }

    function error(errorGmaps){
        posGlobal = {D:50.8333,k:50.8333};
        var message = "";
        // Check for known errors
        switch (errorGmaps.code) {
            case errorGmaps.PERMISSION_DENIED:
                message = "This website does not have permission to use " +
                "the Geolocation API";
                break;
            case errorGmaps.POSITION_UNAVAILABLE:
                message = "The current position could not be determined.";
                break;
            case errorGmaps.PERMISSION_DENIED_TIMEOUT:
                message = "The current position could not be determined " +
                "within the specified timeout period.";
                break;
            default:
                initialize(pos);
                break;
        }
        // If it's an unknown error, build a message that includes
        // information that helps identify the situation, so that
        // the error handler can be updated.
        if (message === "")
        {
            var strErrorCode = errorGmaps.code.toString();
            message = "The position could not be determined due to " +
            "an unknown error (Code: " + strErrorCode + ").";
        }
        console.log(message);
    }
})();

function initialize(pos) {
    posGlobal = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    console.log(posGlobal);
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
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addDomListener(window, 'scroll', function() {
        google.maps.event.trigger(map, "resize");
        map.setCenter(posGlobal);
    });
}

