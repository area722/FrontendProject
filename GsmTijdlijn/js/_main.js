skrollr.init({
	smoothScrolling: false,
	mobileDeceleration: 0.004
});

(function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("geoloc is niet ondersteund op deze browser");
	}

	function showPosition(pos){
		console.log(pos);
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


