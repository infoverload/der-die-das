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
	var article;
	var der, die, das;
	var temp;
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

        // create our word collections
        der = [ 'Mann', 'Blick', 'Fall', 'Ruf', 'Hof', 'Tod', 'Sinn', 'Weg', 'Vogel', 'Vater' ];
        der = this.arrayShuffle(der);
        die = [ 'Frau', 'Arbeit', 'Angst', 'Mutter', 'Erde', 'Fliege', 'Frucht', 'Heimat', 'Kunst', 'Luft' ];
        die = this.arrayShuffle(die);
        das = [ 'Auto', 'Amt', 'Bild', 'Ei', 'Ding', 'Dorf', 'Gesetz', 'Herz', 'Leben', 'Spiel' ];
        das = this.arrayShuffle(das);

        temp = [];
	   
	    var num = Math.floor((Math.random() * 3) + 1);  // Randomize one of the articles
	    if (num == 1) {
	    	article = this.add.text(DDD.GAME_WIDTH-430, 16, 'DER', { fontSize: '36px', fill: '#DEB' });
	    	
	    	// take 5 words from the shuffled DER array and put them in even indices of temp array	    	
	    	for (var i = 0; i < 9; i++) {
	    		if (i % 2 == 0) {
                   temp[i] = der[i];
                }
	        } 
	        // take 3 words from the shuffled DIE array and append them to odd indices of temp array	        
	    	for (var i = 1; i < 6; i++) {
                if (i % 2 != 0) {
                   temp[i] = die[i];
                }
	        } 
	        // take 2 words from the shuffled DAS array and append them to odd indices of temp array	        
	    	for (var i = 7; i < 10; i++) {
	    		if (i % 2 != 0) {
                    temp[i] = das[i];
                }
	        } 	       
	    }
	    else if (num == 2) {
	    	article = this.add.text(DDD.GAME_WIDTH-430, 16, 'DIE', { fontSize: '36px', fill: '#DEB' });

	    	// take 5 words from the DIE array and put them in temp array	    	
	    	for (var i = 0; i < 9; i++) {
	    		if (i % 2 == 0) {
                    temp[i] = die[i];
                }
	        } 
	        // take 3 words from DER array and append them to temp array	        
	    	for (var i = 1; i < 6; i++) {
	    		if (i % 2 != 0) {
                    temp[i] = der[i];
                }
	        } 
	        // take 2 words from DAS array and append them to temp array	        
	    	for (var i = 7; i < 10; i++) {
	    		if (i % 2 != 0) {
                    temp[i] = das[i];
                }
	        } 	        
	    }
	    else {
	        article = this.add.text(DDD.GAME_WIDTH-430, 16, 'DAS', { fontSize: '36px', fill: '#DEB' });

	        // take 5 words from the DAS array and put them in temp array	    	
	    	for (var i = 0; i < 9; i++) {
	    		if (i % 2 == 0) {
                    temp[i] = das[i];
                }
	        } 
	        // take 3 words from DIE array and append them to temp array	        
	    	for (var i = 1; i < 6; i++) {
	    		if (i % 2 != 0) {
                    temp[i] = die[i];
                }
	        } 
	        // take 2 words from DER array and append them to temp array	        
	    	for (var i = 7; i < 10; i++) {
	    		if (i % 2 != 0) {
                    temp[i] = der[i];
                }
	        } 	        
	    }

	    correctHearts = this.add.group(); // the hearts group contains the correct hearts
	    correctHearts.enableBody = true;   // enable physics for any heart created in this group
	    incorrectHearts = this.add.group(); // the hearts group contains the incorrect hearts
	    incorrectHearts.enableBody = true;   // enable physics for any heart created in this group

	    for (var i = 0; i < 10; i++) {

	    	if (i % 2 == 0) {
		        var correctHeart = correctHearts.create(i * 79, 0, 'heart'); // create a heart inside of the 'correctHearts' group
		        var word = this.add.text(i + 22, i + 20, temp[i], { fontSize: '14px', fill: '#222' }, correctHearts);
		        correctHeart.addChild(word);
		        correctHeart.body.gravity.y = 300;	        
		        correctHeart.body.bounce.y = 0.2 + Math.random() * 0.2;  
	        }
            else {
		        var incorrectHeart = incorrectHearts.create(i * 79, 0, 'heart'); // create a heart inside of the 'incorrectHearts' group
		        var word = this.add.text(i + 22, i + 20, temp[i], { fontSize: '14px', fill: '#222' }, incorrectHearts);
		        incorrectHeart.addChild(word);
		        incorrectHeart.body.gravity.y = 300;	        
		        incorrectHeart.body.bounce.y = 0.2 + Math.random() * 0.2;  
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
