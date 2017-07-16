Vue.component("menuContainer", {
	template: '<div id="menu-container"><div id="menu" v-bind:data-extended="fullscreen"><div id="fullscreen-container"><component v-on:loaded="fullscreenViewLoaded" v-bind:is="fullscreenView"></component></div><div id="boxes-container"><component v-on:loaded="boxesViewLoaded" v-bind:is="boxesView"></component></div></div></div>',
	data: function(){
		return {
			fullscreen: false,
			fullscreenView: 'achievements',
			boxesView: 'boxes',
			visible: false,
			fullscreenComponent: null,
			boxesComponent: null,
			app: null
		};
	},
	components: {
		statistics: STATISTICS,
		achievements: ACHIEVEMENTS,
		profile: PROFILE,
		boxes: BOXES,
		race_bar: RACE_BAR,
		routes_list: ROUTES_LIST
	},
	methods: {
		fullscreenViewLoaded: function(v){
			this.fullscreenComponent = v;
			v.menu = this;
		},
		boxesViewLoaded: function(v){
			this.boxesComponent = v;
			v.menu = this;
		},
		setFullscreen: function(b){
			this.fullscreen = b;
			if(window.JSInterface)window.JSInterface.setCanGoBack(b);
		},
		openStats: function(){
			this.fullscreenView = "statistics";
			this.setFullscreen(true);		
		},
		openProfile: function(){
			this.fullscreenView = "profile";
			this.setFullscreen(true);
		},
		openAchievements: function(){
			this.fullscreenView = "achievements";
			this.setFullscreen(true);
		},
		openRace: function(){
			this.fullscreenView = "routes_list";
			this.setFullscreen(true);
		},
		startRace: function(){
			this.boxesView = "race_bar"
			this.setFullscreen(false);
		}
	},
	mounted: function(){
		this.$emit("menu:loaded", this);
		var self = this;
		document.addEventListener("backButton", function(){
			if(self.fullscreen)self.setFullscreen(false);
		});
	}
});
