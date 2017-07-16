var ACHIEVEMENTS = {
	template: '<div><div class="achievement" v-for="item in items"><b>{{ item.name }}</b>  {{ item.description }}</div></div>',
	data: function(){
		return {
			items: []
		};
	},
	methods: {
		
	},
	mounted: function(){
		this.$emit("loaded", this);
		this.$http.get('http://juniorjpdj.pl:9080/achievements', {responseType: "json"}).then(response => {
			this.items = response.body;
		}, response => {
		});
	}
};
