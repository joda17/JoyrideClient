var app;
function load(){
	app = new Vue({
		el: "#app",
		data: {
			maps: null,
			menu: null,
			race: null
		},
		methods: {
			mapsLoaded: function(m){
				this.maps = m;
			},
			menuLoaded: function(m){
				this.menu = m;
				m.app = this;
			}
		},
		mounted: function(){
			var http_start = new XMLHttpRequest();
			var params = "email=example2@kek.com&password=kek";
			http_start.open("POST", "http://juniorjpdj.pl:9080/login", true);
			http_start.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http_start.send(params);
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
