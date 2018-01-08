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

		//make sure the game doesn't pause if it loses focus
		this.game.stage.disableVisibilityChange = true;
		//make the background a dark color
		this.game.stage.backgroundColor = "#050505";
		//add the logo
		this.game.add.existing(this.gameTitle);

		//ad text menu options to the menu, each leading to a different state
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

//add in the game mixins to this game state for the menu options
Phaser.Utils.mixinPrototype(velorunner.MenuState.prototype, velorunner.mixins);