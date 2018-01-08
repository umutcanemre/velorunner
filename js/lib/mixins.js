//object to contain my mixins
velorunner.mixins = {
	//function to draw add menu options easily, parameters are the text of the button, the action upon being clicked, and the type of button it is
	addMenuOption: function (text, callback, className) {
		//if no classname is provided, make it the menuconfig default, or if that also isn't provided, automatically make it default
		className = className || (className = this.menuConfig.className || "default");
		//start the menu off at the menuconfigs start x, or automatically at center
		var x = this.menuConfig.startX === "center" ? this.game.world.centerX : this.menuConfig.startX;
		//start the menu off vertically at menuconfigs startY
		var y = this.menuConfig.startY;
		//create the menu options text, set it's position relative to where the last menu option was, and style the object based on the mainstyle class used in the config
		var txt = this.game.add.text(x, (this.optionCount * 48) + y, text, mainstyle.menuoption[className]);
		//set the texts anchor to center if it was specified to center in the config
		txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);
		//allow the text to be used as input
		txt.inputEnabled = true;
		//make it so that on mouserelease of the text, the callback function is run
		txt.events.onInputUp.add(callback);
		//make it so on hover, the menuoptions style changes to the hover property of it's class
		txt.events.onInputOver.add(function(target) {
			target.setStyle(this.mainstyle.menuoption[className].hover);
		});

		//make it so when the user stops hovering the style of the text returns to it's classes default properties
		txt.events.onInputOut.add(function(target) {
			target.setStyle(this.mainstyle.menuoption[className]);
		});

		//increment the optioncount to keep track of how many menu options have been created in this list
		this.optionCount ++; 
	},
};