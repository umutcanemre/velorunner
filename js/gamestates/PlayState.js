//state that contains code for playing the game

//TODO Fix obstacle recycling

velorunner.PlayState = function() {
	this.player = null;
	this.background = null;
	this.globalMap = null;
	this.layer = null;
	this.Obstacles = null;
	this.lastSpawnedObstacle = 0;
	velorunner.levelSpeed = 300;
};



velorunner.PlayState.prototype = {
	create: function () {
		//start physics, call functions to initialize world and player
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 1300;
		this.createBackground();
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
		//var lastPos = velorunner.gameWidth;

		this.createObstacle(velorunner.gameWidth + (Math.floor(Math.random() * 300)), 550);
		this.lastSpawnedObstacle = 0;

		for (var i = 0; i < 5; i++) {
			this.createObstacle(Obstacles.children[this.lastSpawnedObstacle].x + 250 + (Math.floor(Math.random() * 1000)), 550);
			//this.lastSpawnedObstacle = Obstacles.children[i].z;
			//console.log(Obstacles.children[this.lastSpawnedObstacle].z);
			//lastPos = Obstacles.children[i].x;
		}
	},

	createObstacle: function(x, y) {
		var temp = new velorunner.Obstacle(this.game, x, y);
		this.game.add.existing(temp);
		Obstacles.add(temp);
		this.lastSpawnedObstacle = temp.z;
	},

	createPlayer: function (x, y) {
		player = new velorunner.Player (this.game, x, y);
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
		this.game.physics.arcade.collide(player, Obstacles, null, this.playerObstacleCollision, this);
		this.background.autoScroll(-velorunner.levelSpeed / 4, 0);
		this.wrapObstaclesAround();

		velorunner.levelSpeed += 0.1;

	},

	playerObstacleCollision: function(Player, obstacle) {

		if (Math.abs(Player.body.velocity.x) >= obstacle.BreakVel) {
			this.resetObstacle(obstacle);
			return false;
		} 

		else {
			player.kill();
		}
	}, 

	resetObstacle: function (obstacle) {
		obstacle.position.x = Obstacles.children[this.lastSpawnedObstacle].x + 250 + Math.floor(Math.random() * 1000);
		this.lastSpawnedObstacle = obstacle.z;
	},

	wrapObstaclesAround: function () {
		Obstacles.forEachAlive(function (obstacle) {
			if (obstacle.body.x + obstacle.width < 0) {
				this.resetObstacle(obstacle);
			}
		}, this) 
	},
	
	render: function() {
		this.game.debug.bodyInfo(Obstacles.children[1], 0, 10);
	},

};

velorunner.getLevelSpeed = function () {
	return velorunner.levelSpeed;
}
