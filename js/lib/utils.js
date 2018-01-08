//object to contain my utilities
var utils = {
	//simple utility to set the anchor point of sprites into it's center
	centerGameObjects: function (objects) {
		//for each object passed into the function, set it's anchor to it's center
		objects.forEach(function (object) {
			object.anchor.setTo(0.5);
		})
	},
};

