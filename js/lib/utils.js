//object to contain my utilities
var utils = {
	//simple utility to set the anchor point of sprites into it's center
	centerGameObjects: function (objects) {
		objects.forEach(function (object) {
			object.anchor.setTo(0.5);
		})
	},
};

