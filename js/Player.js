//player object
velorunner.Player = function(game, x, y, anchor) {
	//variables controlling how fast it accelerates, deaccelerates, and it's status of living
	this.acceleration = 5;
	this.deaccelerationRate = 10;
	this.alive = true;
	this.anchor = anchor;
	//this.maxVelocity = 900;

	//invoke phaser sprite for player
	Phaser.Sprite.call(this, game, x, y, "atlas", 'testing0.png');
	//set anchor to center
	utils.centerGameObjects([this]);

	//enable physics and collide with world bounds
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

//make Player extend Sprite
velorunner.Player.prototype = Object.create(Phaser.Sprite.prototype);
//set it's constructor
velorunner.Player.prototype.constructor = velorunner.Player;

velorunner.Player.prototype.update = function () {
	//game.physics.arcade.collide(this, layer);
	//movePlayer();
	//animatePlayer();

	//if it's alive, move and animate the player based on their movements
	if (this.alive) {
		/*//if pressing left
		if (this.playerControls.left.isDown) {
			//make player move left
			this.body.velocity.x -= this.acceleration;
			//if player is on the floor, play the running left animation
			if (this.body.onFloor()) {
				this.animations.play('left');
			}
		} */

		//if they are pressing right, make them move right
		if (this.playerControls.down.isDown) {
			this.body.velocity.x += this.acceleration;
			//this.scale.setTo(1);
		}


		else {
			//slowly make the player stop after they release the key

			//if the player has momentum towards the right
			if (this.x > this.anchor) {
				//if reducing the player's velocity again will make the player start moving in the other direction, stop reducing velocity and stop the player
				if (this.x - this.body.velocity.x < 0) {
					this.body.velocity.x = 0;
					this.x = this.anchor;
				}

				//slowly reduce the player's velocity by adding velocity in the other direction
				else {
					this.body.velocity.x -= this.deaccelerationRate;
				}
			}

			/*
			//if the player has momentum towards the left
			else {
				//if reducing the player's velocity again will make the player start moving in the other direction, stop reducing velocity and stop the player
				if (this.body.velocity.x + this.deaccelerationRate > 0) {
					this.body.velocity.x = 0;
				}
				//slowly reduce the player's velocity by adding velocity in the other direction
				else {
					this.body.velocity.x += this.deaccelerationRate;
				}
			}*/

		}

		//if the player is on the floor and they press up, give them upwards velocity
		if (this.playerControls.up.isDown && this.body.onFloor()) {
			this.body.velocity.y = -550;
		}

		//if the player is in the air, play jumping animation
		if (!this.body.onFloor()) {
			this.animations.play('jump');
		}

		//if the player is running normally and on floor play the right animation
		else if (this.body.onFloor() && !this.playerControls.left.isDown){
			this.animations.play('right');
		}
	}

};