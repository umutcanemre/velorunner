//Create global object to contain everything
var velorunner = velorunner || {};

//Set dimensions of the actual game
velorunner.gameWidth = 1500; 
velorunner.gameHeight = 600;

//create Phaser game object inside velorunner
velorunner.game = new Phaser.Game(velorunner.gameWidth, velorunner.gameHeight, Phaser.AUTO);

velorunner.gameOptions = {
	playSound: true,
	playMusic: true
};
velorunner.musicPlayer = {};

//declare bootstate
velorunner.BootState = function () {};


//code for bootstate
velorunner.BootState.prototype = {
	//load in all the assets necessary for the loading screen (loading bar, logo, the loadstate itself)
	preload: function () {
		//loading bar, logo, code for loadstate
		this.game.load.image('loadingbar', 'assets/images/loadingbar.png');
		this.game.load.image('logo', 'assets/images/logo2.png');
		this.game.load.script('LoadState', 'js/gamestates/LoadState.js');

		//load in my utilities and pollyfill
		this.game.load.script('pollyfill', 'js/lib/pollyfill.js');
		this.game.load.script('utils', 'js/lib/utils.js');
	},

	create: function () {
		//game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		//game.scale.setUserScale(2, 2);
		
		//Make sure assets/sprites don't get blurred at all
		this.game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		//add and start the loading state
		this.game.state.add('LoadState', velorunner.LoadState);
		this.game.state.start('LoadState');
	}
};

//add bootstate to game and start it
velorunner.game.state.add('BootState', velorunner.BootState);
velorunner.game.state.start("BootState"); 