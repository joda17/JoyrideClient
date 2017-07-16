var PROFILE = {
	template: '<ul><li v-for="item in items">{{ item.name }}  {{ item.description }}</li></ul>',
	data: function(){
		return {
			items: []
		};
	},
	methods: {
		
	},
	mounted: function(){
		this.$emit("loaded", this);
		this.$http.get('http://juniorjpdj.pl:9080/profile', {responseType: "json"}).then(response => {
			//this.items = response.body;
		}, response => {
		});
	}
};
