var ROUTES_LIST = {
	template: '<ul><li v-for="item in routes" v-on:click="openRoute(item.id)">{{ item.name }}</li></ul>',
	data: function(){
		return {
			menu: null,
			inProgress: false,
			routes: []
		};
	},
	methods: {
		openRoute: function(id){
			var self = this;
			this.inProgress = true;
			this.menu.startRace();
			var map = this.menu.app.maps;
			map.setMode(MAP_MODE.RACE);//{route_id: id}}
			//self.$http.post('http://juniorjpdj.pl:9080/races/start', "").then(response => {}, response => {});	
			var http_start = new XMLHttpRequest();
			var params = "route_id=" + id;
			http_start.open("POST", "http://juniorjpdj.pl:9080/races/start", true);
			http_start.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http_start.send(params);

			map.loadPath([]);
			var route = null;
			for(var r of this.routes)if(r.id == id)route = r;
			this.$http.get('http://juniorjpdj.pl:9080/map/routes/route/' + id + '/waypoints', {responseType: "json"}).then(response => {
				response.body.unshift({lat: route.lat,lng: route.lng});
				map.loadPath(response.body);
			}, response => {
			});
			document.addEventListener("nfc", function(e){
				if(e.detail.id == route.nfc_stop){
					//self.$http.post('http://juniorjpdj.pl:9080/races/stop', { body: {route_id: id, nfcEndId: route.nfc_stop}}).then(response => {}, response => {});
					var http_stop = new XMLHttpRequest();
					var params = "route_id=" + id + "&nfcEndId=" + route.nfc_stop;
					http_stop.open("POST", "http://juniorjpdj.pl:9080/races/stop", true);
					http_stop.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					http_stop.onreadystatechange = function() {
	    					if(http_stop.readyState == 4 && http_stop.status == 200) {
	    						console.log(http_stop.responseText);
						}
					}
					http_stop.send(params);
					map.setMode(MAP_MODE.BACKGROUND);
					self.menu.stopRace();
				}
			});
		}
	},
	mounted: function(){
		this.$emit("loaded", this);
		var self = this;
		document.addEventListener("nfc", function(e){
			if(self.inProgress)return;
			var id = e.detail.id;
			self.$http.get('http://juniorjpdj.pl:9080/races/routes/' + id, {responseType: "json"}).then(response => {
				self.routes = response.body;
			}, response => {
			});	
		})
	}
};
