//state used to display progress in loading main game assets

velorunner.LoadState = function() {};

velorunner.LoadState.prototype = {
	//functions to organize types of media being loaded
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

	loadScripts: function () {
		console.log('loading scripts..');
		this.game.load.script('WebFont', 'js/vendor/webfontloader.js');
		this.game.load.script('mixins', 'js/lib/mixins.js');
		this.game.load.script('style', 'js/lib/style.js');
		this.game.load.script('MenuState', 'js/gamestates/MenuState.js');
		this.game.load.script('PlayState', 'js/gamestates/PlayState.js');
		this.game.load.script('OptionsState', 'js/gamestates/OptionsState.js');
		this.game.load.script('CreditsState', 'js/gamestates/CreditsState.js');
		this.game.load.script('PlayerJS', 'js/Player.js');
		this.game.load.script('ObstacleJS', 'js/Obstacle.js');
	},

	loadMusic: function() {
		console.log('loading music..');
		//this.game.load.audio('monkeys', 'assets/music/monkeys.mp3');
	},

	loadTextures: function () {
		console.log('loading textures..');
		this.game.load.image('gameTitle', 'assets/images/title2.png');
		this.game.load.atlas('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json');

		this.game.load.image('tileset', 'assets/tilemaps/placeholderTileset.png')
		this.game.load.tilemap('map', 'assets/tilemaps/placeholderMap.json', null, Phaser.Tilemap.TILED_JSON);
	},

	loadFonts: function () {
		console.log('loading fonts..');
		WebFontConfig = {
			custom: {
				families: ['8-bitpusab'],
				urls: ['assets/style/8-bitpusab.css']
			}
		};
	}, 

	addGameStates: function () {
		console.log('initializing Gamestates');		
		this.game.state.add('MenuState', velorunner.MenuState);
		this.game.state.add('PlayState', velorunner.PlayState);
		//this.game.state.add('LevelsState', velorunner.LevelsState);
		this.game.state.add('OptionsState', velorunner.OptionsState);
		//this.game.state.add('CreditsState', velorunner.CreditsState);
	},

	addGameMusic: function() {
		console.log('adding music..');
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