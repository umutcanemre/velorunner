velorunner.Player = function(game, x, y) {
	this.acceleration = 5;
	this.deaccelerationRate = 10;
	this.alive = true;
	//this.maxVelocity = 900;

	Phaser.Sprite.call(this, game, x, y, "atlas", 'testing0.png');
	utils.centerGameObjects([this]);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;

	//add animations
	this.animations.add('idle', Phaser.Animation.generateFrameNames('testing', 0, 0, '.png'), 5, true);
	this.animations.add('left', Phaser.Animation.generateFrameNames('testing', 1, 5, '.png'), 5, true);
	this.animations.add('right', Phaser.Animation.generateFrameNames('testing', 6, 10, '.png'), 5, true);
	this.animations.add('jump', Phaser.Animation.generateFrameNames('testing', 11, 11, '.png'), 5, true);

	//start off with idle animation
	this.animations.play('idle');


	//define controls for player
	this.playerControls = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
		left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
		down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
	};

	//capture arrow keys
	game.input.keyboard.addKeyCapture ( [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP]);

};

velorunner.Player.prototype = Object.create(Phaser.Sprite.prototype);
velorunner.Player.prototype.constructor = velorunner.Player;

velorunner.Player.prototype.update = function () {
	//game.physics.arcade.collide(this, layer);
	//movePlayer();
	//animatePlayer();
	if (this.alive) {
		if (this.playerControls.left.isDown) {
			this.body.velocity.x -= this.acceleration;
			//this.scale.setTo(-1);
			if (this.body.onFloor()) {
				this.animations.play('left');
			}
		}

		else if (this.playerControls.right.isDown) {
			this.body.velocity.x += this.acceleration;
			//this.scale.setTo(1);
		}

		else {
			//this.coastStop(player, 10)
			if (this.body.velocity.x > 0) {
				if (this.body.velocity.x - this.deaccelerationRate < 0) {
					this.body.velocity.x = 0;
				}

				else {
					this.body.velocity.x -= this.deaccelerationRate;
				}
			}

			else {
				if (this.body.velocity.x + this.deaccelerationRate > 0) {
					this.body.velocity.x = 0;
				}

				else {
					this.body.velocity.x += this.deaccelerationRate;
				}
			}

		}

		if (this.playerControls.up.isDown && this.body.onFloor()) {
			this.body.velocity.y = -550;
		}

		if (!this.body.onFloor()) {
			this.animations.play('jump');
		}

		else if (this.body.onFloor() && !this.playerControls.left.isDown){
			this.animations.play('right');
		}
	}

};



/*
animatePlayer = function() {

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

};

movePlayer = function() {
	

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
}; */
