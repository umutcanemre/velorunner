velorunner.mixins = {
	addMenuOption: function (text, callback, className) {
		className = className || (className = this.menuConfig.className || "default");
		var x = this.menuConfig.startX === "center" ? this.game.world.centerX : this.menuConfig.startX;
		var y = this.menuConfig.startY;
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