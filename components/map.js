var MAP_MODE = {
	BACKGROUND: 0,
	RACE: 1
}
Vue.component("maps", {
	template: '<div id="maps"></div>',
	data: function(){
		return {
			map: null,
			forceCenter: false,
			posMarker: null,
			attractionsMarkers: [],
			polyline: null 
		};
	},
	methods: {
		init: function(){
			var map = this.map = new google.maps.Map(this.$el, {
				zoom: 15,
				center: {lat: -25.363, lng: 131.044},
				disableDefaultUI: true
			});
			this.posMarker = new google.maps.Marker({
				position: map.center,
				map: map,
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					fillColor: 'blue',
					fillOpacity: 1,
					scale: 3,
					strokeColor: 'blue',
					strokeWeight: 4
				}
			});

			this.polyline = new google.maps.Polyline({
				strokeColor: 'blue',
				strokeOpacity: 1.0,
				strokeWeight: 7
			});
			this.setMode(MAP_MODE.BACKGROUND);
		},
		setMode: function(m){
			switch(m){
			case MAP_MODE.BACKGROUND:
				this.forceCenter = true;
				this.map.setOptions({
					gestureHandling: "none",
					zoomControl: false,
					scrollwheel:  false,
					disableDoubleClickZoom: true	
				});
				for(var m of this.attractionsMarkers){
					m.setMap(this.map);
				}
				this.polyline.setMap(null);
				break;
			case MAP_MODE.RACE:
				this.forceCenter = true;
				this.map.setOptions({
					gestureHandling: "none",
					zoomControl: false,
					scrollwheel:  false,
					disableDoubleClickZoom: true	
				});
				for(var m of this.attractionsMarkers){
					m.setMap(null);
				}
				this.polyline.setMap(this.map);
				break;
			}
		},
		loadMarkers: function(a){
			var markers = [];
			if(a)for(var m of a){
				var marker = new google.maps.Marker({
					position: {lat: m.lat, lng: m.lng},
					map: null
				});
				markers.push(marker);
			}
			return markers;
		},
		loadPath: function(p){
			this.polyline.setPath(p);
		}
	},
	mounted: function(){
		this.init();
		this.$emit("maps:loaded", this);
		var self = this;
		document.addEventListener("gps", function(p){
			if(self.forceCenter)self.map.setCenter({lat: p.detail.lat, lng: p.detail.lng});
			self.posMarker.setPosition({lat: p.detail.lat, lng: p.detail.lng});
		});
		this.$http.get('http://juniorjpdj.pl:9080/map/markers', {responseType: "json"}).then(response => {
			self.attractionsMarkers = self.loadMarkers(response.body);
			self.setMode(MAP_MODE.BACKGROUND);
		}, response => {
		});
		
	}
});
