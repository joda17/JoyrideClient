var RACE_BAR = {
	template: '<div><span style="float:left;margin-left: 30px;line-height: 80px;font-size: 50px">{{ distance }}m</span>  <span style="float: right;margin-right: 30px;line-height: 80px;font-size: 50px">{{ time }}</span></div>',
	data: function(){
		return {
			menu: null,
			distance: 0,
			startTime: new Date().getTime(),
			time: ""
		}
	},
	methods: {
		calcTime: function(){
			var d = new Date().getTime() - this.startTime;
			var dSec = Math.floor(d/1000);
			var sec = dSec%60;
			var min = Math.floor(dSec/60);
			this.time = min + ":" + sec;
			var self = this;
			setTimeout(function(){
				self.calcTime();
			}, 500);
		}
	},
	computed: {
		/*time: function(){
			var d = new Date().getTime() - this.startTime;
			console.log(d/1000);
			var sec = (d/1000)%60;
			var min = (d/1000)/60;
			return min + ":" + sec;
		}*/
	},
	mounted: function(){
		this.$emit("loaded", this);
		this.calcTime();
	}
};
