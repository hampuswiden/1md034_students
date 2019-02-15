
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
});

