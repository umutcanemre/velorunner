velorunner.Obstacle = function(game, x, y, speed) {
		Phaser.Sprite.call(this, game, x, y, "atlas", 'testing1.png');
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.enableBody = true;
		this.body.immovable = true;
		this.body.allowGravity = false;
		this.BreakVel = 400;

		//this.body.velocity.x = -300;

};

velorunner.Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
velorunner.Obstacle.prototype.constructor = velorunner.Obstacle;

velorunner.Obstacle.prototype.update = function () {
	this.body.velocity.x = -velorunner.getLevelSpeed();
};