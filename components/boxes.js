var BOXES = {
	template: '<div><div class="box" v-on:click="openStats">Staty</div><div class="box" v-on:click="openProfile">Profil</div><div class="box" v-on:click="openAchievements">Osiągnięcia</div><div class="box" v-on:click="openRace">Wyścig</div></div>',
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
