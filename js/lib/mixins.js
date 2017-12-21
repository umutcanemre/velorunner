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
		//create the menu options text, set it's position
		var txt = this.game.add.text(x, (this.optionCount * 48) + y, text, mainstyle.menuoption[className]);
		txt.anchor.setTo(this.menuConfig.startX === "center" ? 0.5 : 0.0);
		txt.inputEnabled = true;
		txt.events.onInputUp.add(callback);
		txt.events.onInputOver.add(function(target) {
			target.setStyle(this.mainstyle.menuoption[className].hover);
		});

		txt.events.onInputOut.add(function(target) {
			target.setStyle(this.mainstyle.menuoption[className]);
		});
		this.optionCount ++; 
	},
};