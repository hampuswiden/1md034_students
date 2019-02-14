function MenuItem(name, img, kcal, gluten, lactose) {
    this.name = name;
    this.img = img;
    this.kcal = kcal;
    this.gluten = gluten;
    this.lactose = lactose;
    this.info = function() {
        return this.name + ' ' + this.kcal + ' kCal';
    };
}

function createFiveBurgers() {
	var menuItem1 = new MenuItem("Burger A", "img/the_fire_burger.jpg", 1, true, true);
	var menuItem2 = new MenuItem("Burger B", "img/the_fire_burger.jpg", 2, true, true);
	var menuItem3 = new MenuItem("Burger C", "img/the_fire_burger.jpg", 3, false, true);
	var menuItem4 = new MenuItem("Burger D", "img/the_fire_burger.jpg", 4, true, false);
	var menuItem5 = new MenuItem("Burger E", "img/the_fire_burger.jpg", 5, false, false);
	
	var menuItemArray = [menuItem1, menuItem2, menuItem3, menuItem4, menuItem5];
	return menuItemArray;
}

function updateBurgerSelection(array) {
	var el = document.getElementById('burgerWrapper');
	while(el.firstChild) {
		el.removeChild(el.firstChild);
	}
	//loop
	for (number in array) {
		console.log("nunmber " + number);
		var menuItem = array[number];
		console.log(typeof(menuItem));
		var box = document.createElement('div');
		box.setAttribute('class', 'box');

		var title = document.createElement('h3');
		title.innerText = menuItem.name;
		box.appendChild(title);

		var image = document.createElement('img');
		image.setAttribute('src', menuItem.img);
		image.setAttribute('class', 'burgerImage');
		box.appendChild(image);

		var ul = document.createElement('ul');

		var kcal = document.createElement('li');
		kcal.innerText = menuItem.kcal;
		ul.appendChild(kcal);

		if (menuItem.gluten) {
			var gluten = document.createElement('li');
			var allergy = document.createElement('span');
			allergy.setAttribute('class', 'allergy');
			allergy.innerText = " gluten";
			gluten.innerText = "Contains";
			gluten.appendChild(allergy);
			ul.appendChild(gluten);
		}

		if (menuItem.lactose) {
			var lactose = document.createElement('li');
			var allergy = document.createElement('span');
			allergy.setAttribute('class', 'allergy');
			allergy.innerText = " lactose";
			lactose.innerText = "Contains";
			lactose.appendChild(allergy);
			ul.appendChild(lactose);
		}

		box.appendChild(ul);

		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "burger";
		checkbox.value = menuItem.name;
		box.appendChild(checkbox);

		// Add to wrapper!
		el.appendChild(box);
	}
}

function loadMenu() {
	updateBurgerSelection(burgers);
}

function clickButton() {
	console.log("Button clicked!")
	var arrayValues = readValues();
	writeToBottom(arrayValues);
}

function readValues() {
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
	console.log(myValues);
	return myValues;
}

function writeToBottom(array) {
	var categories = ["gender: ", "name: ", "email: ", "address ", "house: ", "payment method ", "burger "];
	var el = document.getElementById("bottomInfo");
	
	while(el.firstChild) {
		el.removeChild(el.firstChild);
	}

	for (number in array) {
		var text = document.createElement('p');
		if (number<6) {
			text.innerText = categories[number] + array[number];
		}
		else {
			text.innerText = categories[6] + (number-5).toString() + ": " + array[number];
		}
		el.appendChild(text);
	}
}

//var item = new MenuItem("Test Burger", "img/the_fire_burger.jpg", 1000, true, false);
//console.log( item.info() );

//var myBurgers = new createFiveBurgers();
//console.log(myBurgers);

//updateBurgerSelection(burgers);

//var myButton = document.getElementById('submitButton');
//myButton.addEventListener("click", clickButton);