//state used to display progress in loading main game assets
velorunner.LoadState = function() {};

//code for loadstate
velorunner.LoadState.prototype = {
	//initialize loading bar and logo
	init: function () {
		//initialize loading bar and logo
		this.loadingBar = this.game.make.sprite(this.game.world.centerX - 200, 400, "loadingbar");
		this.logo = this.game.make.sprite(this.game.world.centerX, 200, 'logo');

		//center anchor point of both logo and loading bar	
		utils.centerGameObjects([this.logo]);		
	},


	preload: function () {
		//make everything black
		this.game.stage.backgroundColor = "#050505";
		//add loading bar and logo to the screen
		this.game.add.existing(this.logo);
		this.game.add.existing(this.loadingBar);
		//make this.loadingbar the phaser preload sprite
		this.load.setPreloadSprite(this.loadingBar);

		//call functions to load each section of the game
		this.loadScripts();
		this.loadMusic();
		this.loadTextures();
		this.loadFonts(); 
	},

	//functions to load various parts of the game
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
		//console.log('loading music..');
		//this.game.load.audio('monkeys', 'assets/music/monkeys.mp3');
	},

	loadTextures: function () {
		console.log('loading textures..');
		this.game.load.image('energybar', 'assets/images/energy.png');

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

	//add the loaded game states to the game
	addGameStates: function () {
		console.log('initializing Gamestates');		
		this.game.state.add('MenuState', velorunner.MenuState);
		this.game.state.add('PlayState', velorunner.PlayState);
		//this.game.state.add('LevelsState', velorunner.LevelsState);
		this.game.state.add('OptionsState', velorunner.OptionsState);
		//this.game.state.add('CreditsState', velorunner.CreditsState);
	},

	//add music to the game
	addGameMusic: function() {
		//console.log('adding music..');
		//musicPlayer = this.game.add.audio('monkeys');
		//musicPlayer.loop= true;
		//musicPlayer.play();

	},

	create: function () {
		//add gamestates and music to the game
		this.addGameStates();
		this.addGameMusic();
		//start the menu
		this.game.state.start('MenuState');
	}
};