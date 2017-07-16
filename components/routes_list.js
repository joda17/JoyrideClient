var ROUTES_LIST = {
	template: '<ul><li v-for="item in routes" v-on:click="openRoute(item.id)">{{ item.name }}</li></ul>',
	data: function(){
		return {
			menu: null,
			routes: []
		};
	},
	methods: {
		openRoute: function(id){
			this.menu.startRace();
			var map = this.menu.app.maps;
			map.setMode(MAP_MODE.RACE);
		}
	},
	mounted: function(){
		this.$emit("loaded", this);
		var self = this;
		document.addEventListener("nfc", function(e){
			var id = e.detail.id;
			self.$http.get('http://juniorjpdj.pl:9080/races/routes/' + id, {responseType: "json"}).then(response => {
				self.routes = response.body;
			}, response => {
			});	
		})
	}
};
