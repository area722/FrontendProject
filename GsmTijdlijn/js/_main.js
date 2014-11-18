/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-GsmTijdlijn-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-GsmTijdlijn-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-GsmTijdlijn-b div#vpw-GsmTijdlijn-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

/**
 * This demo was prepared for you by Petr Tichy - Ihatetomatoes.net
 * Want to see more similar demos and tutorials?
 * Help by spreading the word about Ihatetomatoes blog.
 * Facebook - https://www.facebook.com/ihatetomatoesblog
 * Twitter - https://twitter.com/ihatetomatoes
 * Google+ - https://plus.google.com/u/0/109859280204979591787/about
 */

( function( $ ) {

	$window = $(window);
	$htmlbody = $('html,body');
	$slide = $('.homeSlide');
	$body = $('body');
	
    //FadeIn all sections    
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		var s = skrollr.init();
		
		// get window size
	    winH = $window.height();
	    
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    $slide.height(winH*2);
	    $('#slide-2, #slide-3').height(winH*3);
	    
	    s.refresh($('.homeSlide'));
	    
	}
		
} )( jQuery );

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
	var map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
	mapGlobal = map;
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
		map: map,
		animation: google.maps.Animation.DROP
	});
}

var count = 0;
google.maps.event.addDomListener(window, 'scroll', function() {
	google.maps.event.trigger(mapGlobal, "resize");
	mapGlobal.setCenter(posGlobal);
});


