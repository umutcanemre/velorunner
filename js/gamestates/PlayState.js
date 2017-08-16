//state that contains code for playing the game

velorunner.PlayState = function() {
	velorunner.player = null;
	velorunner.background = null;
	velorunner.globalMap = null;
	velorunner.layer = null;
	velorunner.Obstacles = null;
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

		this.game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
	},


	createBackground: function() {
		//initialize background(s)
		background = this.game.add.tileSprite(0, 0, velorunner.gameWidth, velorunner.gameHeight, 'atlas', 'bg.png');
		//background.fixedToCamera = true;
	},

	createTilemap: function() {
		//initialize tilemap
		globalMap = this.game.add.tilemap('map');
		globalMap.addTilesetImage('placeholderTileset', 'tileset');

		//create layers
		layer = globalMap.createLayer('Tile Layer 1');
		layer.resizeWorld();

		//set tiles that can be collided with
		globalMap.setCollisionByExclusion([0]);
	},

	populate: function() {
		Obstacles = this.game.add.group();
		//Obstacles.enableBody = true;

		this.createObstacle(this.game.world.centerX, 550);
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

	},

	playerObstacleCollision: function(Player, obstacle) {

		if (Math.abs(Player.body.velocity.x) >= obstacle.health) {
			obstacle.kill();
			return false;
		} 

		else {
			//return true;
			player.kill();
		}

	}, 
	
	render: function() {
		this.game.debug.bodyInfo(player, 0, 10);
	},

	

};




