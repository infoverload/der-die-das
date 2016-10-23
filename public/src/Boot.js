var DDD = {};  // create global object for the game

DDD.Boot = function(game) {};

// define contents of DDD.Boot
DDD.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBar', 'assets/loading-bar.png');
	},
	create: function() {
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.updateLayout(true);
		// start the Preloader state
		this.state.start('Preloader');
	}
};