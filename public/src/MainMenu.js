DDD.MainMenu = function(game) {};

// define contents of DDD.MainMenu
DDD.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'background');
		this.add.sprite((DDD.GAME_WIDTH-395)/2, 60, 'title');
		this.add.button(DDD.GAME_WIDTH-401-190, DDD.GAME_HEIGHT-143-10, 'button-start', this.startHowto, this, 1, 0, 2);
	},
	startHowto: function() {
		this.state.start('StoryHowto');
	}
};