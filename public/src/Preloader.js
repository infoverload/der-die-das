DDD.Preloader = function(game) {
    DDD.GAME_WIDTH = 800;
    DDD.GAME_HEIGHT = 640;
};

// define contents of DDD.Preloader
DDD.Preloader.prototype = {
    preload: function() {
        this.load.image('screen-howto', 'assets/screen-howto.png');
        this.load.image('howto', 'assets/howto.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('title', 'assets/title.png');
        this.load.spritesheet('hans', 'assets/hans.png', 40, 56);
        this.load.spritesheet('button-start', 'assets/button-start.png', 401, 143);
        this.load.spritesheet('button-continue', 'assets/button-continue.png', 401, 143);
    },
    create: function() {
	    this.state.start('MainMenu');
    }
};