//state that contains code for playing the game

//TODO Fix obstacle recycling

velorunner.PlayState = function() {
	this.player = null;
	this.background = null;
	this.globalMap = null;
	this.layer = null;
	this.Obstacles = null;
	velorunner.levelSpeed = 300;
};



velorunner.PlayState.prototype = {
	create: function () {
		//start physics, call functions to initialize world and player
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.game.physics.arcade.gravity.y = 250;

		this.createBackground();

		//this.createTilemap();

		this.populate();

		this.createPlayer(1, 550);		 

		//this.game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
	},


	createBackground: function() {
		//initialize background(s)
		this.background = this.game.add.tileSprite(0, 0, velorunner.gameWidth, velorunner.gameHeight, 'atlas', 'bg.png');
		//background.fixedToCamera = true;
	},

	populate: function() {
		Obstacles = this.game.add.group();
		//Obstacles.enableBody = true;
		var lastPos = velorunner.gameWidth;

		for (var i = 0; i < 10; i++) {
			this.createObstacle(lastPos + 250 + (Math.floor(Math.random() * 1000)), 550);
			lastPos = Obstacles.children[i].x;
		}
	},

	createObstacle: function(x, y) {
		var temp = new velorunner.Obstacle(this.game, x, y);
		this.game.add.existing(temp);
		Obstacles.add(temp);
	},

	createPlayer: function (x, y) {
		player = new velorunner.Player (this.game, x, y);
		this.game.add.existing(player);
	},

	bindControls: function() {
		//set controls
		this.gameControls = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
		};
		//capture arrow keys
		this.game.input.keyboard.addKeyCapture ( [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP]);
	},

	update: function() {
		this.game.physics.arcade.collide(player, Obstacles, null, this.playerObstacleCollision, this);
		this.background.autoScroll(-velorunner.levelSpeed / 4, 0);
		this.recycleObstacles();
		//Obstacles.body.velocity.x = this.levelSpeed;

		velorunner.levelSpeed += 0.1;

		Obstacles.forEach(function (obstacle) {
			console.log(obstacle.BreakVel);
		})
	},

	playerObstacleCollision: function(Player, obstacle) {

		if (Math.abs(Player.body.velocity.x) >= obstacle.BreakVel) {
			obstacle.kill();
			this.reviveObstacle(obstacle);
			return false;
		} 

		else {
			//return true;
			player.kill();
		}
	}, 

	reviveObstacle: function (obstacle) {
		obstacle.position.x = velorunner.gameWidth + 250 + Math.floor(Math.random() * 1000);
		obstacle.revive();
	},

	recycleObstacles: function () {
		Obstacles.forEachAlive(function (obstacle) {
			if (obstacle.body.x + obstacle.width < 0) {
				obstacle.kill();	
				this.reviveObstacle(obstacle);
			}
		}, this) 

		/*Obstacles.forEachAlive(function (obstacle) {
			if (obstacle.body.x + obstacle.width < 0) {
				obstacle.kill();
				this.reviveObstacle(obstacle);
			}
		}, this) */
	},
	
	render: function() {
		this.game.debug.bodyInfo(player, 0, 10);
	},

	

};

velorunner.getLevelSpeed = function () {
	return velorunner.levelSpeed;
}
