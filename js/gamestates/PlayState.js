//state that contains code for playing the game

//TODO Fix obstacle recycling

velorunner.PlayState = function() {
	//variables
	this.player = null;
	this.background = null;
	this.globalMap = null;


	this.layer = null;
	this.Obstacles = null;
	this.lastSpawnedObstacle = 0;
	this.distance = 0;
	this.level1 = false;
	velorunner.levelSpeed = 400;
	velorunner.pause = false;
};



velorunner.PlayState.prototype = {
	//menu config for game over screen
	menuConfig: {
		startX: 'center',
		startY: 188
	},

	create: function () {
		this.player = null;
		this.background = null;
		this.globalMap = null;
		this.layer = null;
		this.Obstacles = null;
		this.lastSpawnedObstacle = 0;
		this.distance = 0;
		velorunner.levelSpeed = 400;


		//start physics, call functions to initialize world and player
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1300;
		this.createBackground();
		this.populate();
		this.optionCount = 1;
		this.createPlayer(240, 550);		 
	},

	createBackground: function() {
		//initialize background(s)
		this.background = this.game.add.tileSprite(0, 0, velorunner.gameWidth, velorunner.gameHeight, 'atlas', 'bg.png');
		this.distanceText = this.game.add.text(15, 15, "Distance: " + this.distance, {font: '24px 8-bitpusab', fill: 'white'})
		this.energyBar = this.game.add.sprite(this.game.world.centerX - 200, 15, 'energybar');
			
		this.pauseButton = this.createButton(velorunner.gameWidth - 200, 15, velorunner.pause ? 'Unpause' : 'Pause', (function(target) {
			if (!velorunner.pause) {
				this.tempPlayerYVel = player.body.velocity.y;
			}

			else {
				 player.body.velocity.y = this.tempPlayerYVel;
			}
			velorunner.pause = !velorunner.pause; 
			target.text = velorunner.pause ? 'Unpause' : 'Pause';
		}));
		//background.fixedToCamera = true;

		this.controlsText = this.game.add.text(this.game.world.centerX, 45, "Space to Jump\nDownarrow to move right\n" + this.distance, {font: '12px 8-bitpusab', fill: 'white'})
		this.controlsText.anchor.x = 0.5;
	},

	

	populate: function() {
		//add group for obstacles
		Obstacles = this.game.add.group();
		//var lastPos = velorunner.gameWidth;

		//create first obstacle and make the last spawned obstacle 0
		this.createObstacle(velorunner.gameWidth + (Math.floor(Math.random() * 300)), 550);
		this.lastSpawnedObstacle = 0;

		//spawn 5 total obstacles
		for (var i = 0; i < 5; i++) {
			this.createObstacle(Obstacles.children[this.lastSpawnedObstacle].x + 250 + (Math.floor(Math.random() * 1000)), 550);
			//this.lastSpawnedObstacle = Obstacles.children[i].z;
			//console.log(Obstacles.children[this.lastSpawnedObstacle].z);
			//lastPos = Obstacles.children[i].x;
		}
	},

	//spawn a single obstalce
	createObstacle: function(x, y) {
		//Creates an obstacle object, adds it to obstacles group, sets lastSpawnedObstacle variable to the position of newly created obstacle
		var temp = new velorunner.Obstacle(this.game, x, y);
		this.game.add.existing(temp);
		Obstacles.add(temp);
		this.lastSpawnedObstacle = temp.z;
	},

	createPlayer: function (x, y) {
		//creates the player
		player = new velorunner.Player(this.game, x, y);
		this.game.add.existing(player);
	},

	/*bindControls: function() {
		//set controls
		this.gameControls = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
		};

		//capture arrow keys
		this.game.input.keyboard.addKeyCapture ( [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP]);
	}, */

	update: function() {
		//collide player with all obstacles
		this.game.physics.arcade.collide(player, Obstacles, null, this.playerObstacleCollision, this);
		this.wrapObstaclesAround();
		this.background.tint = Phaser.Color.getColor(255, (255 - (this.distance/2)), (255 - (this.distance/2)));

		this.distanceText.setText("Distance: " + Math.floor(this.distance));

		if (!velorunner.pause) {
			this.game.physics.arcade.gravity.y = 1300;
			this.background.autoScroll(-velorunner.levelSpeed / 4, 0);
			if (player.alive) {
				this.distance += (velorunner.levelSpeed/2000);
				
				//increase speed slowly each tick
				velorunner.levelSpeed += 0.1;
				

				this.energyBar.width = player.energy * 4;
				
			}
		}

		else {
			this.game.physics.arcade.gravity.y = 0;
			this.background.autoScroll(0, 0);
		}
	},


	//in the event of player obstacle collision
	playerObstacleCollision: function(Player, obstacle) {
		//if the player is moving fast enough, break "kill" the obstalce
		if (Math.abs(player.body.velocity.x) >= obstacle.BreakVel) {
			this.resetObstacle(obstacle);
			return false;
		} 

		//otherwise end the game
		else {
			//player.kill();
			this.killPlayer();
		}
	}, 

	resetObstacle: function (obstacle) {
		obstacle.position.x = Obstacles.children[this.lastSpawnedObstacle].x + 250 + Math.floor(Math.random() * 1000);
		this.lastSpawnedObstacle = obstacle.z;
	},

	//every time an obstalce reaches the end, put it back to the start
	wrapObstaclesAround: function () {
		Obstacles.forEachAlive(function (obstacle) {
			if (obstacle.body.x + obstacle.width < 0) {
				this.resetObstacle(obstacle);
			}
		}, this) 
	},

	//function to kill player and end game
	killPlayer: function() {
		//kill player sprite and do gameover
		player.alive = false;
		player.kill();
		this.gameOver();
	},

	gameOver: function() {
		//create a game over screen
		//add a translucent overlay
		var bmd = this.game.add.bitmapData(1, 1);
		bmd.fill(0, 0, 0);
		var translucentOverlay = this.game.add.sprite(0, 0, bmd);
		//set overlay to game size
		translucentOverlay.scale.setTo(velorunner.gameWidth, velorunner.gameHeight);
		//start it transparent
		translucentOverlay.alpha = 0;
		//make it gradually become darker
		this.game.add.tween(translucentOverlay).to({alpha:0.5}, 500, Phaser.Easing.Quadratic.In, true);
		//add logo
		this.gameTitle = this.game.add.image(this.game.world.centerX, 148, 'gameTitle');
		utils.centerGameObjects([this.gameTitle]);

		this.pauseButton.destroy();

		//add a play again button
		this.addMenuOption('Play Again', function () {
			console.log("Game Restarting");
			//velorunner.levelSpeed = 300;
      		velorunner.game.state.start('PlayState');
    	}, "redbase");
	},
	
	//display debug info

	

};

//return speed of level
velorunner.getLevelSpeed = function () {
	return velorunner.levelSpeed;
}

Phaser.Utils.mixinPrototype(velorunner.PlayState.prototype, velorunner.mixins);