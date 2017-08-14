var gameWidth = 800, gameHeight = 600;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO), 
BootState = function () {},
gameOptions = {
	playSound: true,
	playMusic: true
},
musicPlayer;


BootState.prototype = {
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

// enable crisp rendering
		game.renderer.renderSession.roundPixels = true;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);


		this.game.state.add('LoadState', LoadState);
		this.game.state.start('LoadState');
	}
};


this.game.state.add('BootState', BootState);
/*game.state.add('LoadState', LoadState);
game.state.add('MenuState', MenuState);
game.state.add('PlayState', PlayState); */

this.game.state.start("BootState"); 