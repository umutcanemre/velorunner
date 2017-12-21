//Game state to display menu
velorunner.MenuState = function() {};

//code for menustate
velorunner.MenuState.prototype = {
	//declare menu config, for 
	menuConfig:  {
		startX: "center",
		startY: 188
	}, 

	init: function() {
		console.log('loading succesful');
    	this.gameTitle = this.game.add.image(this.game.world.centerX, 148, 'gameTitle');
		utils.centerGameObjects([this.gameTitle]);
		this.optionCount = 1;
	}, 

	create: function() {
		/*if (music.name !== 'monkeys' && playMusic) {
			music.stop();
			music = this.game.add.audio('monkeys');
			music.loop = true;
			music.play;
		} */

		this.game.stage.disableVisibilityChange = true;
		this.game.stage.backgroundColor = "#050505";
		this.game.add.existing(this.gameTitle);

		this.addMenuOption('play', function () {
      		velorunner.game.state.start('PlayState');
    	}, "redbase");

    	this.addMenuOption('options', function () {
      		velorunner.game.state.start('OptionsState');
    	});

    	this.addMenuOption('credits', function () {
      		console.log('You clicked credits!');
    	}); 

	} 
} ;

Phaser.Utils.mixinPrototype(velorunner.MenuState.prototype, velorunner.mixins);