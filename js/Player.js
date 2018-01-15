//player object
velorunner.Player = function(game, x, y) {
	//variables controlling how fast it accelerates, deaccelerates, and it's status of living
	this.acceleration = 10;
	this.deaccelerationRate = 10;
	this.alive = true;
	this.anchorPoint = x;
	this.energy = 100;
	this.energyRecharge = 0.5;
	this.dynamicDeaccelerationRate = this.deaccelerationRate;
	//this.maxVelocity = 900;

	//invoke phaser sprite for player
	Phaser.Sprite.call(this, game, x, y, "atlas", 'testing0.png');
	//set anchorPoint to center
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
		down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	};

	//capture arrow keys
	game.input.keyboard.addKeyCapture ( [Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP]);

};

//make Player extend Sprite
velorunner.Player.prototype = Object.create(Phaser.Sprite.prototype);
//set it's constructor
velorunner.Player.prototype.constructor = velorunner.Player;

velorunner.Player.prototype.update = function () {

	//if it's alive, move and animate the player based on their movements
	if (this.alive) {
		//console.log(this.dynamicDeaccelerationRate);
		/*//collide player with a distance 300 pixels away from their anchor point
		if (this.x >= this.anchorPoint + 300 && this.body.velocity.x > 0) {
			this.body.velocity.x = 0;
		}*/

		//collide player with anchor point
		if (this.x <= this.anchorPoint) {
			this.dynamicDeaccelerationRate = this.deaccelerationRate;
			this.body.velocity.x = 0;
			this.x = this.anchorPoint;
		}

		//if they are pressing right, make them move right
		if (this.playerControls.down.isDown && this.energy > 0) {
			this.dynamicDeaccelerationRate = this.deaccelerationRate;
			if (this.energy - 1.5 < 0) {
				this.energy = 0;
			}

			else {
				this.energy -= 1.5;
			}

			if (this.body.velocity.x < 500) {
				this.body.velocity.x += this.acceleration;
				//this.scale.setTo(1);
			}
		}

		//slowly make the player go toward the starting point if the player is not moving right
		else if (this.x > this.anchorPoint) {
			if (this.body.velocity.x > 100) {
				this.body.velocity.x -= this.dynamicDeaccelerationRate * 2;
			}

			else {
				this.body.velocity.x -= this.dynamicDeaccelerationRate;
			}

			//if reducing the player's velocity again will make the player start moving in the other direction, stop reducing velocity and stop the player
			this.dynamicDeaccelerationRate = this.dynamicDeaccelerationRate/1.01;
			

		}

		//if the player is not moving, recharge their energy
		if (!this.playerControls.down.isDown && this.energy < 100) {
			//make sure energy doesn't exceed 100
			if (this.energy + this.energyRecharge > 100) {
				this.energy = 100;
			}

			else {
				this.energy += this.energyRecharge;
			}
		}

		//if the player is on the floor and they press up, give them upwards velocity
		if (this.playerControls.space.isDown && this.body.onFloor()) {
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