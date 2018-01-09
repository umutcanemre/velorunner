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

		//depending on whether music is enabled or not, show the option as "Mute Music" or "Play Music," toggle music volume on press
		this.addMenuOption(playMusic ? 'mute music' : 'play music', function (target) {
			//toggle whether music is playing or not
      		playMusic = !playMusic;
      		//toggle button
      		target.text = playMusic ? 'mute music' : 'play music';
      		//turn music on or off
      		velorunner.musicPlayer.volume = playMusic ? '1' : '0';
    	});

		//nothing yet
    	this.addMenuOption('sound', function (target) {
      		console.log('you pressed sound');
    	});

    	//back to menu button
		this.addMenuOption('back', function () {
			//goes back to menu
      		velorunner.game.state.start('MenuState');
    	}); 
	} 
};

//add mixins to this gamestate
Phaser.Utils.mixinPrototype(velorunner.OptionsState.prototype, velorunner.mixins); 