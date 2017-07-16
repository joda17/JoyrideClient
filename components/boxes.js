var BOXES = {
	template: '<div style="text-align:center"><div class="box" style="background-image: url(icons/stats.png)" v-on:click="openStats"></div><div class="box" v-on:click="openProfile" style="background-image: url(icons/profile.png)"></div><div class="box" v-on:click="openAchievements" style="background-image: url(icons/ach.png)"></div><div class="box" v-on:click="openRace" style="background-image: url(icons/race.png)"></div></div>',
	data: function(){
		return {
			menu: null
		};
	},
	methods: {
		openStats: function(){
			if(this.menu)this.menu.openStats();
		},
		openProfile: function(){
			if(this.menu)this.menu.openProfile();
		},
		openAchievements: function(){
			if(this.menu)this.menu.openAchievements();
		},
		openRace: function(){
			if(this.menu)this.menu.openRace();
		}
	},
	mounted: function(){
		this.$emit("loaded", this);
	}
};
