DDD.Game = function(game) {
	var player;
	var platforms;
	var clouds;
	var cursors;
	var correctHearts, incorrectHearts;
	var score;
	var lives;
	var scoreText;
	var livesText;
	var articleTitle;
	var article;
};

// define contents of DDD.Game
DDD.Game.prototype = { 

	create: function() {
	    
	    this.physics.startSystem(Phaser.Physics.ARCADE);  // enable the Arcade Physics system

	    this.add.sprite(0, 0, 'background');  // a simple background for our game
	    
	    platforms = this.add.group();  // the platforms group contains the ground    
	    platforms.enableBody = true;  // enable physics for any object that is created in this group

	    var ground = platforms.create(0, this.world.height - 64, 'ground');  // create the ground	    
	    ground.scale.setTo(2, 2);  //  scale it to fit width of game 
	    ground.body.immovable = true;
	    
	    clouds = this.add.group();  // the clouds group contains the clouds
	    clouds.enableBody = true;   
	    var cloud = clouds.create(Math.random() * (500 - 300) + 300, Math.random() * (500 - 300) + 300, 'cloud');  // create cloud 1
	    cloud.body.immovable = true; 
	    cloud = clouds.create(Math.random() * (30 - 10) + 10, Math.random() * (400 - 300) + 300, 'cloud');  // create cloud 2
		cloud.body.immovable = true;

	    var randoCloud =  Math.floor((Math.random() * 3) + 1);
	    if (randoCloud == 3) {    
		    cloud = clouds.create(Math.random() * (100 - 50) + 50, Math.random() * (300 - 200) + 200, 'cloud');  // create cloud 3
		    cloud.body.immovable = true;
	    }
	    
	    player = this.add.sprite(40, this.world.height - 150, 'hans');  // the player and its settings	    
	    this.physics.arcade.enable(player);  // enable physics on the player

	    // player physics properties
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;

	    // our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    // the score
	    score = 0;
	    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#333' });

	    // lives remaining
	    lives = 5;
	    livesText = this.add.text(700, 16, 'Lives: 5', { fontSize: '24px', fill: '#B12' });

        // create our word collection
        var wordArr = [{article:'der', word:'Mann'}, {article:'der', word:'Blick'}, {article:'der', word:'Fall'}, {article:'der', word:'Ruf'}, {article:'der', word:'Hof'}, {article:'der', word:'Tod'}, {article:'der', word:'Sinn'}, {article:'der', word:'Weg'}, {article:'der', word:'Vogel'}, {article:'der', word:'Vater'}, {article:'die', word:'Frau'}, {article:'die', word:'Arbeit'}, {article:'die', word:'Angst'}, {article:'die', word:'Mutter'}, {article:'die', word:'Erde'}, {article:'die', word:'Fliege'}, {article:'die', word:'Frucht'}, {article:'die', word:'Heimat'}, {article:'die', word:'Kunst'}, {article:'die', word:'Luft'}, {article:'das', word:'Auto'}, {article:'das', word:'Amt'}, {article:'das', word:'Bild'}, {article:'das', word:'Ei'}, {article:'das', word:'Ding'}, {article:'das', word:'Dorf'}, {article:'das', word:'Gesetz'}, {article:'das', word:'Herz'}, {article:'das', word:'Leben'}, {article:'das', word:'Spiel'}];
	    wordArr = this.arrayShuffle(wordArr);

	    var num = Math.floor((Math.random() * 3) + 1);  // Randomize one of the articles
	    if (num == 1) {
	    	articleTitle = this.add.text(DDD.GAME_WIDTH-430, 16, 'DER', { fontSize: '36px', fill: '#DEB' });	
	    	article = 'der';    	
	    }
	    else if (num == 2) {
	    	articleTitle = this.add.text(DDD.GAME_WIDTH-430, 16, 'DIE', { fontSize: '36px', fill: '#DEB' });
	    	article = 'die';  
	    }
	    else {
	        articleTitle = this.add.text(DDD.GAME_WIDTH-430, 16, 'DAS', { fontSize: '36px', fill: '#DEB' });
	        article = 'das';  
	    }

	    correctHearts = this.add.group(); // the hearts group contains the correct hearts
	    correctHearts.enableBody = true;   // enable physics for any heart created in this group
	    incorrectHearts = this.add.group(); // the hearts group contains the incorrect hearts
	    incorrectHearts.enableBody = true;   // enable physics for any heart created in this group

        var j = 0;  
	    for (var i = 0; i < wordArr.length; i++) {
            if (correctHearts.length < 5) {
		    	if (wordArr[i].article == article) {
			        var correctHeart = correctHearts.create(j * 78, 0, 'heart'); // create a heart inside of the 'correctHearts' group
			        var word = this.add.text(j + 22, j + 20, wordArr[i].word, { fontSize: '14px', fill: '#222' }, correctHearts);
			        correctHeart.addChild(word);
			        correctHeart.body.gravity.y = 300;	        
			        correctHeart.body.bounce.y = 0.2 + Math.random() * 0.2;  
			        j++;
		        }
	        }
	        if (incorrectHearts.length < 5) {
	            if (wordArr[i].article !== article) {
			        var incorrectHeart = incorrectHearts.create(j * 78, 0, 'heart'); // create a heart inside of the 'incorrectHearts' group
			        var word = this.add.text(j + 22, j + 20, wordArr[i].word, { fontSize: '14px', fill: '#222' }, incorrectHearts);
			        incorrectHeart.addChild(word);
			        incorrectHeart.body.gravity.y = 300;	        
			        incorrectHeart.body.bounce.y = 0.2 + Math.random() * 0.2;  
			        j++;
	            }
            }
        }
	    
	    cursors = this.input.keyboard.createCursorKeys();  // our controls

	},

	update: function() {
	    // collide the player and the hearts with the platforms and clouds
	    this.physics.arcade.collide(player, platforms);
	    this.physics.arcade.collide(correctHearts, platforms);
	    this.physics.arcade.collide(incorrectHearts, platforms);
	    this.physics.arcade.collide(player, clouds);
	    this.physics.arcade.collide(correctHearts, clouds);
	    this.physics.arcade.collide(incorrectHearts, clouds);
	   
	    this.physics.arcade.overlap(player, correctHearts, this.collectCorrectHearts, null, this);
	    this.physics.arcade.overlap(player, incorrectHearts, this.collectIncorrectHearts, null, this);

	    //  reset the players velocity (movement)
	    player.body.velocity.x = 0;

	    if (cursors.left.isDown) {
	        player.body.velocity.x = -150;
	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown) {
	        player.body.velocity.x = 150;
	        player.animations.play('right');
	    }
	    else {
	        player.animations.stop();
	        player.frame = 4;
	    }
	    
	    //  allow the player to jump
	    if (cursors.up.isDown) {
	        player.body.velocity.y = -500;
	    }

	    if (lives == 0) {
	    	this.loseGame();
	    }

	    if (score == 50 && lives > 0) {
	    	this.winGame();
	    }
	},

	arrayShuffle: function(a) {
	    var j, x, i;
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	    return a;
	},

	collectCorrectHearts: function(player, correctHeart) {		
		correctHeart.destroy(); 
		score += 10;
		scoreText.text = 'Score: ' + score;		
	},

	collectIncorrectHearts: function(player, incorrectHeart) {        
        incorrectHeart.destroy(); 
		lives -= 1;
		livesText.text = 'Lives: ' + lives;
	},

	loseGame: function() {    
	    var loseGameText = this.add.text(150, 150, 'You lost! Click to try again.', { fontSize: '24px', fill: '#000' });    
        this.input.onTap.addOnce(this.restart, this);  // the "click to restart" handler
    },

    winGame: function() {   
	    var winGameText = this.add.text(200, 150, 'You won!', { fontSize: '24px', fill: '#000' });
	    // FUTURE: can progress to next level which includes more hearts, timer, music
    },

    restart: function() {
    	this.state.start('Game');
    }

};
