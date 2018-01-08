//variable containing some default style properties for menu option text
var mainstyle;

//self invoking function to set values of mainstyle
(function() {
	//make a default color to use later
	var defaultColor = '#ffffff';

	//assign properties
	mainstyle = {
		menuoption: {
			//add a base property which will be applied to all the styles of options
			base: {
				//sets the font and size of the hover outline for all menu options
				font: '24px 8-bitpusab',
				strokeThickness: 8
			},

			//redbase makes the menu option red with a red highlight when hovered upon
			redbase: {
				fill: 'red',
				hover: {
					stroke: 'rgba(200, 0, 0, 0.5)'
				}
			},

			//default menu option, white with grey hover border
			default: {
				fill: defaultColor,
				//stroke: 'rgba(0, 0, 0, 0)',	
				hover: {
					stroke: 'rgba(200, 200, 200, 0.5)'
				}
			},
						
		}
	};

	//function to assign the properties of a base property in an object to all other properties within the object
	assignValuesToAllNested = function(obj, base) {
		//for every property in the object
		for (var prop in obj) {
			//if the property being looked at isn't the "base" property
			if (obj[prop] !== "base") {
				//assign the properties of "base" to it
				Object.assign(obj[prop], base);

				//for the properties nested within the property in the main object, apply the base, and the properties of it's parent
				for (var key in obj[prop]) {
					if (obj[prop].hasOwnProperty(key)) {
						Object.assign(obj[prop][key], base, obj[prop]);
						//console.log(obj[prop][key]);	
					}				
				}
			}
		}
	};

	assignValuesToAllNested(mainstyle.menuoption, mainstyle.menuoption.base); 

	
}) (); 