Vue.component("menuContainer", {
	template: '<div id="menu-container"><div id="menu" v-bind:data-extended="fullscreen"><div id="fullscreen-container"><component v-on:loaded="fullscreenViewLoaded" v-bind:is="fullscreenView"></component></div><div id="boxes-container"><component v-on:loaded="boxesViewLoaded" v-bind:is="boxesView"></component></div></div></div>',
	data: function(){
		return {
			fullscreen: true,
			fullscreenView: 'achievments',
			boxesView: 'profile',
			visible: false,
			fullscreenComponent: null,
			boxesComponent: null
		};
	},
	components: {
		statistics: STATISTICS,
		achievments: ACHIEVMENTS,
		profile: PROFILE
	},
	methods: {
		fullscreenViewLoaded: function(v){
			this.fullscreenComponent = v;
		},
		boxesViewLoaded: function(v){
			this.boxesComponent = v;
		}
	},
	mounted: function(){
		this.$emit("menu:loaded", this);
	}
});
