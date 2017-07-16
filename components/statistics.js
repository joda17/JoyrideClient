var STATISTICS = {
	template: '<ul><li v-for="item in items">{{ item[0] }} : {{ item[1] }}</li></ul>',
	data: function(){
		return {
			items: [["nazwa1", "wartość1"],["nazwa1", "wartość1"]]
		};
	},
	methods: {
		
	},
	mounted: function(){
		this.$emit("loaded", this);
		this.$http.get('http://juniorjpdj.pl:9080/players/1/statistics', {responseType: "json"}).then(response => {
			this.items = response.body;
		}, response => {
		});
	}
};
