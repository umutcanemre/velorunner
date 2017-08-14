//state used to display progress in loading main game assets

var LoadState = function() {};

LoadState.prototype = {
	//functions to organize types of media being loaded
	loadScripts: function () {
		this.game.load.script('WebFont', 'js/vendor/webfontloader.js');
		this.game.load.script('mixins', 'js/lib/mixins.js');
		this.game.load.script('style', 'js/lib/style.js');
		this.game.load.script('MenuState', 'js/gamestates/MenuState.js');
		this.game.load.script('PlayState', 'js/gamestates/PlayState.js');
		this.game.load.script('LevelsState', 'js/gamestates/LevelsState.js');
		this.game.load.script('OptionsState', 'js/gamestates/OptionsState.js');
		this.game.load.script('CreditsState', 'js/gamestates/CreditsState.js');
		this.game.load.script('PlayerJS', 'js/Player.js');
	},

	loadMusic: function() {
		//this.game.load.audio('monkeys', 'assets/music/monkeys.mp3');
	},

	loadTextures: function () {
		this.game.load.image('gameTitle', 'assets/images/title2.png');
		this.game.load.atlas('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json');

		this.game.load.image('tileset', 'assets/tilemaps/placeholderTileset.png')
		this.game.load.tilemap('map', 'assets/tilemaps/placeholderMap.json', null, Phaser.Tilemap.TILED_JSON);
	},

	loadFonts: function () {
		WebFontConfig = {
			custom: {
				families: ['8-bitpusab'],
				urls: ['assets/style/8-bitpusab.css']
			}
		};
	}, 

	init: function () {
		this.loadingBar = this.game.make.sprite(this.game.world.centerX - 200, 400, "loadingbar");
		this.logo = this.game.make.sprite(this.game.world.centerX, 200, 'logo');	
		utils.centerGameObjects([this.logo]);		
	},

	preload: function () {
		this.game.stage.backgroundColor = "#050505";
		this.game.add.existing(this.logo);
		this.game.add.existing(this.loadingBar);
		this.load.setPreloadSprite(this.loadingBar);
		this.loadScripts();
		this.loadMusic();
		this.loadTextures();
		this.loadFonts(); 
	},

	addGameStates: function () {		
		this.game.state.add('MenuState', MenuState);
		this.game.state.add('PlayState', PlayState);
		this.game.state.add('LevelsState', LevelsState);
		this.game.state.add('OptionsState', OptionsState);
		this.game.state.add('CreditsState', CreditsState);
	},

	addGameMusic: function() {
		//musicPlayer = this.game.add.audio('monkeys');
		//musicPlayer.loop= true;
		//musicPlayer.play();

	},

	create: function () {

		this.addGameStates();
		this.addGameMusic();
		this.game.state.start('MenuState');
	}
};