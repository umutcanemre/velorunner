//state that contains code for playing the game

velorunner.PlayState = function() {};

var player;
var background;
var globalMap;
var layer;
var Obstacles;

velorunner.PlayState.prototype = {
	create: function () {
		//start physics, call functions to initialize world and player
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.game.physics.arcade.gravity.y = 250;

		this.createBackground();

		//this.createTilemap();

		this.populate();

		//this.createPlayer(this.game.world.centerX - 60, 50);

		this.createPlayer(1, 1);

		//this.bindControls();		 

		this.game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

		//this.game.debug.font = "8px Courier";
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

		this.createObstacle(this.game.world.centerX, 400);
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

	/*createPlayer: function (x, y) {
		//create player sprite, set anchor to center, set scale of player, enable physics
		player = this.game.add.sprite(x, y, 'atlas', 'testing0.png' );
		utils.centerGameObjects([player]);
		//player.scale.setTo(0.99); //TODO figure out why player glitches on some surfaces without changing scale
		this.game.physics.enable(player, Phaser.Physics.ARCADE);

		player.body.collideWorldBounds = true;

		//add animations

		player.animations.add('idle', Phaser.Animation.generateFrameNames('testing', 0, 0, '.png'), 5, true);
		player.animations.add('left', Phaser.Animation.generateFrameNames('testing', 1, 5, '.png'), 5, true);
		player.animations.add('right', Phaser.Animation.generateFrameNames('testing', 6, 10, '.png'), 5, true);
		player.animations.add('jump', Phaser.Animation.generateFrameNames('testing', 11, 11, '.png'), 5, true);
		//start off with idle animation
		player.animations.play('idle');

	}, */

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
		//this.game.physics.arcade.collide(player, layer);

		this.game.physics.arcade.collide(player, Obstacles, null, this.playerObstacleCollision, this);
		//this.movePlayer();
		//this.animatePlayer();

		//console.log(player.body.velocity.x);

		//player.body.velocity.x = 10;

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

	/*movePlayer: function() {
		var acceleration = 5;
		var velocity = 900;

		if (this.gameControls.left.isDown) {
			player.body.velocity.x -= acceleration;
			player.scale.setTo(-1);
		}

		else if (this.gameControls.right.isDown) {
			player.body.velocity.x += acceleration;
			player.scale.setTo(1);
		}

		else {
			this.coastStop(player, 10)
		}

		if (this.gameControls.up.isDown && player.body.onFloor()) {
			player.body.velocity.y = -210;
		}
	}, */

	/*animatePlayer: function() {

		if (player.body.onFloor()) {
			if (player.body.velocity.x != 0) {
				if (this.gameControls.left.isDown || this.gameControls.right.isDown) {
					player.animations.play('right');
				}

				else {
					player.animations.play('left');
				}
				
			}

			else {
				player.animations.play('idle');
			}

		}

		else {
			player.animations.play('jump');
		}

	}, */

	/* coastStop: function(entity, deaccelerationRate) {

		if (entity.body.velocity.x > 0) {
			if (entity.body.velocity.x - deaccelerationRate < 0) {
				entity.body.velocity.x = 0;
			}

			else {
				entity.body.velocity.x -= deaccelerationRate;
			}
		}

		else {
			if (entity.body.velocity.x + deaccelerationRate > 0) {
				entity.body.velocity.x = 0;
			}

			else {
				entity.body.velocity.x += deaccelerationRate;
			}
		}
	}, */

	
	render: function() {
		this.game.debug.bodyInfo(player, 0, 10);
	},

	

};




