velorunner.OptionsState = function() {};

//options screen
velorunner.OptionsState.prototype = {

	//set menuconfig to default, and center text horizontally
	menuConfig:  {
		//className: "redbase",
		startX: "center",
		startY: 188
	}, 

	//set start optioncount to 1
	init: function() {
		this.optionCount = 1;
	},

	create: function () {
		//store existing game settings for sound and music in variables
		var playSound = velorunner.gameOptions.playSound,
			playMusic = velorunner.gameOptions.playMusic;

		//make game not pause on lost focus
		this.game.stage.disableVisibilityChange = true;
		//make dark background color
		this.game.stage.backgroundColor = "#050505";

		//depending on whether the 
		this.addMenuOption(playMusic ? 'mute music' : 'play music', function (target) {
      		playMusic = !playMusic;
      		target.text = playMusic ? 'mute music' : 'play music';
      		velorunner.musicPlayer.volume = playMusic ? '1' : '0';
    	});

    	this.addMenuOption('sound', function (target) {
      		console.log('you pressed sound');
    	});

		this.addMenuOption('back', function () {
      		velorunner.game.state.start('MenuState');
    	}); 
	} 
};

//add mixins to this gamestate
Phaser.Utils.mixinPrototype(velorunner.OptionsState.prototype, velorunner.mixins); 