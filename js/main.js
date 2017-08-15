var velorunner = velorunner || {};

velorunner.gameWidth = 800; 
velorunner.gameHeight = 600;

velorunner.game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO);
velorunner.BootState = function () {};
velorunner.gameOptions = {
	playSound: true,
	playMusic: true
};
velorunner.musicPlayer = {};


velorunner.BootState.prototype = {
	preload: function () {
		this.game.load.image('loadingbar', 'assets/images/loadingbar.png');
		this.game.load.image('logo', 'assets/images/logo2.png');
		this.game.load.script('LoadState', 'js/gamestates/LoadState.js');
		this.game.load.script('pollyfill', 'js/lib/pollyfill.js');
		this.game.load.script('utils', 'js/lib/utils.js');
	},

	create: function () {


		//game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		//game.scale.setUserScale(2, 2);
		
		this.game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);


		this.game.state.add('LoadState', velorunner.LoadState);
		this.game.state.start('LoadState');
	}
};


velorunner.game.state.add('BootState', velorunner.BootState);
/*game.state.add('LoadState', LoadState);
game.state.add('MenuState', MenuState);
game.state.add('PlayState', PlayState); */

velorunner.game.state.start("BootState"); 