DDD.StoryHowto = function(game) {};

DDD.StoryHowto.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'background');
		this.add.sprite(0, 0, 'screen-howto');
		this.add.sprite((DDD.GAME_WIDTH-600)/2, 60, 'howto');
		this.add.button(DDD.GAME_WIDTH-401-190, DDD.GAME_HEIGHT-143-10, 'button-continue', this.startGame, this);
	},
	startGame: function() {
		this.state.start('Game');
	}	
};