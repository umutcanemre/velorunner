var OptionsState = function() {};

OptionsState.prototype = {

	menuConfig:  {
		//className: "redbase",
		startX: "center",
		startY: 188
	}, 


	init: function() {
		this.optionCount = 1;
	},

	create: function () {
		var playSound = gameOptions.playSound,
			playMusic = gameOptions.playMusic;

		game.stage.disableVisibilityChange = true;
		this.game.stage.backgroundColor = "#050505";

		this.addMenuOption(playMusic ? 'mute music' : 'play music', function (target) {
      		playMusic = !playMusic;
      		target.text = playMusic ? 'mute music' : 'play music';
      		musicPlayer.volume = playMusic ? '1' : '0';
    	});

    	this.addMenuOption('sound', function (target) {
      		console.log('you pressed sound');
    	});

		this.addMenuOption('back', function () {
      		this.game.state.start('MenuState');
    	});
	}
};


Phaser.Utils.mixinPrototype(OptionsState.prototype, mixins);