//Game state to display menu

var MenuState = function() {};

MenuState.prototype = {
	menuConfig:  {
		startX: "center",
		startY: 188
	}, 

	init: function() {
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

		game.stage.disableVisibilityChange = true;
		this.game.stage.backgroundColor = "#050505";
		this.game.add.existing(this.gameTitle);

		this.addMenuOption('play', function () {
      		this.game.state.start('PlayState');
    	}, "redbase");

    	this.addMenuOption('levels', function () {
      		console.log('You clicked levels!');
    	});

    	this.addMenuOption('options', function () {
      		this.game.state.start('OptionsState');
    	});

    	this.addMenuOption('credits', function () {
      		console.log('You clicked credits!');
    	}); 

	} 
} ;

Phaser.Utils.mixinPrototype(MenuState.prototype, mixins);