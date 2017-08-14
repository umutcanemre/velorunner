var mainstyle;

 (function() {
	var defaultColor = '#ffffff';

	mainstyle = {
		menuoption: {
			base: {
				font: '24px 8-bitpusab',
				strokeThickness: 8
			},

			redbase: {
				fill: 'red',
				hover: {
					stroke: 'rgba(200, 0, 0, 0.5)'
				}
			},

			default: {
				fill: defaultColor,
				//stroke: 'rgba(0, 0, 0, 0)',	
				hover: {
					stroke: 'rgba(200, 200, 200, 0.5)'
				}
			},

			
			
		}
	};

	//Object.assign(mainstyle.menuoption.default.hover, mainstyle.menuoption.base);
	//Object.assign(mainstyle.menuoption.default, mainstyle.menuoption.base);

	/*for (var key in mainstyle.menuoption) {
		if (key !== "base") {
			Object.assign(mainstyle.menuoption[key], mainstyle.menuoption.base); 

			

			for (var prop in mainstyle.menuoption[key]) {
				Object.assign(mainstyle.menuoption[key][prop], mainstyle.menuoption.base, mainstyle.menuoption[key]);
			}
		}
	} */

	
	assignValuesToAllNested = function(obj, base) {
		for (var prop in obj) {
			if (obj[prop] !== "base") {
				Object.assign(obj[prop], base);
				//console.log(obj[prop]);

				for (var key in obj[prop]) {
					if (obj[prop].hasOwnProperty(key)) {
						Object.assign(obj[prop][key], base, obj[prop]);
						//console.log(obj[prop][key]);	
					}				
				}
			}
		}
	};

	/*assignValuesToAllNested = function(obj, base) {
		if(obj === null || !obj.hasOwnProperty()) {
			return
		}
		
		for (var prop in obj) {
			if (obj[prop] !== "base") {

				Object.assign(obj[prop], base, obj);
				console.log(obj[prop]);
				assignValuesToAllNested(obj[prop], base)
				
			}
		}

}*/




	assignValuesToAllNested(mainstyle.menuoption, mainstyle.menuoption.base); 

	
} ) (); 