
var burgerSelection = new Vue({
	el: '#burger_selection',
	data: {
		selectBurgerText: 'Select Burger',
		burgers: burgers // Array of menuitems (1 menuitem = 1 burger)
	},
	methods: {
    	updateBurgerSelection: function(array) {
    		// Updates burgers to a new array of menuitem's
    		this.burgers = array; 
    	}
  	}
})

var orders = new Vue({
	el: '#orders',
	data: {
		showOrderInfo: false,
		gender: null,
		name: null,
		email: null,
		address: null,
		house: null,
		paymentMethod: null,
		burger: null
	},
	methods:  {
		sendOrder: function() {
			console.log('Button Clicked!');
			//var burgers = this.readValues();
			//console.log(burgers);
			this.writeToBottom();
		},
		readValues: function() {
			var myValues = new Array();

			var radios = document.getElementsByName('gender');
			for (var i = 0, length = radios.length; i < length; i++) {
				if (radios[i].checked) {
					myValues.push(radios[i].value);
					break;
				}
			}


			var fieldValues = document.getElementsByClassName('formValue');
			for (number in fieldValues) {
				if (fieldValues[number].value != undefined) {
					myValues.push(fieldValues[number].value);
				}
			}
				
			var localBurgers = document.getElementsByName('burger');
			for (var i = 0, length = localBurgers.length; i < length; i++) {
				if (localBurgers[i].checked) {
					myValues.push(localBurgers[i].value);
				}
			}
			return myValues;
		},
		showBurgers: function() {
			var burgers = new Array();
			var readValues = this.readValues();
			for (i=0; i<readValues.length; i++) {
				if (i > 3) {
					burgers.push(readValues[i]);
				}
			}
			console.log(readValues.length);
			return burgers;
		},
		writeToBottom: function() {
			this.showOrderInfo = false; // Forces vue to re-read values with readValues() (no optimizing happning, could be implemented in other ways)
			this.showOrderInfo = true;
		}
	}
});