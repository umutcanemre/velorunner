//obstalce object
velorunner.Obstacle = function(game, x, y, speed) {
	//invoke phaser Sprite to obstacle and give it the obstacle sprite and the game and position
	Phaser.Sprite.call(this, game, x, y, "atlas", 'testing1.png');

	//enable physics
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.enableBody = true;
	//make it immovable and immune to game physics
	this.body.immovable = true;
	this.body.allowGravity = false;
	//how fast something must go when colliding with the object to break it
	this.BreakVel = 400;

	//this.body.velocity.x = -300;

};

//make obstacle extend sprite
velorunner.Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
//set constructor
velorunner.Obstacle.prototype.constructor = velorunner.Obstacle;

velorunner.Obstacle.prototype.update = function () {
	//make obstacles move at level speed
	this.body.velocity.x = -velorunner.getLevelSpeed();
};