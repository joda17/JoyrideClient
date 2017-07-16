var app;
function load(){
	app = new Vue({
		el: "#app",
		data: {
			maps: null,
			menu: null
		},
		methods: {
			mapsLoaded: function(m){
				this.maps = m;
			},
			menuLoaded: function(m){
				this.menu = m;
			}
		},
		created: function(){
	
		}
	});
}
if ("geolocation" in navigator){
	navigator.geolocation.watchPosition(function(p){
		document.dispatchEvent(new CustomEvent("gps", {detail: {lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy}}));
	}, function(e){

	}, {
		enableHighAccuracy: true, 
		maximumAge: 30000, 
		timeout: 2700
	});
}
