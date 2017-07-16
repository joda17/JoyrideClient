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
			map.setMode(MAP_MODE.RACE);
			self.$http.post('http://juniorjpdj.pl:9080/races/start', {body: {route_id: id}}).then(response => {}, response => {});	
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
					self.$http.post('http://juniorjpdj.pl:9080/races/stop', {responseType: "json", body: {route_id: id, nfcEndId: route.nfc_stop}}).then(response => {}, response => {});
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
