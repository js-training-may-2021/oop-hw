'use strict';
/**
 * Класс, объекты которого описывают параметры гамбургера
 * 
 * @constructor
 * @param size Размер
 * @param stuffing Начинка
 */
 function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
}

//Размеры и виды начинок
Hamburger.SIZE_SMALL = {name: 'Tiny Tiger', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'Major Bear', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'cheese', price: 10, calories:  20};
Hamburger.STUFFING_SALAD = {name: 'salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'potato', price: 15, calories: 10};

// узнать размер гамбургера
Hamburger.prototype.getSize = function() {
	let size = document.querySelector('input[name="size"]:checked').value;
	if (size === 'small') {
		return Hamburger.SIZE_SMALL
	} else {
		return Hamburger.SIZE_LARGE
	}
};

// Узнать начинку гамбургера
Hamburger.prototype.getStuffing = function () {
	let checkedBoxes = document.querySelectorAll('input[name=addStuff]:checked');
	let stuffing = [];
	for (let i = 0; i < checkedBoxes.length; i++) {
		switch(checkedBoxes[i].id) {
			case 'cheese':
				stuffing.push(Hamburger.STUFFING_CHEESE);
				break;
			case 'salad':
				stuffing.push(Hamburger.STUFFING_SALAD);
				break;
			case 'potato':
				stuffing.push(Hamburger.STUFFING_POTATO);
				break;
			default:
				return stuffing;
		}				
	}
	return stuffing;
};

/**
 * Узнать цену гамбургера 
 * @return {Number} Цена в тугриках
 */
 Hamburger.prototype.calculatePrice = function (burger) {
	 let price = burger.size.price;
	 for (let i = 0; i < burger.stuffing.length; i++){
		 price += burger.stuffing[i].price;
	}
	return price;
 }

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function (burger) {
	let calories = burger.size.calories;
	for (let i = 0; i < burger.stuffing.length; i++){
		calories += burger.stuffing[i].calories;
	}
	return calories;
}

Order.prototype.render = (name, price, calories) => {
	let tableData = document.querySelector('table');
	let markup = `
		<tr>
			<td>${name}</td>
				<td class="price">${price}</td>
				<td class="calories">${calories}</td>
				<td><input type="number" min="0"></td>
				<td class="total-price"></td>
				<td class="total-calories"></td>
			</tr>
	`
	tableData.insertAdjacentHTML('beforeend', markup);
}

Hamburger.prototype.addBurgerToOrder = () => {
	let size = Hamburger.prototype.getSize();
	let stuffing = Hamburger.prototype.getStuffing();
	let burger = new Hamburger(size, stuffing);
	let resultPrice = Hamburger.prototype.calculatePrice(burger);
	let resultCalories = Hamburger.prototype.calculateCalories(burger);
	let name = burger.size.name;
	Order.prototype.render(name, resultPrice, resultCalories);
}

/**
 * Класс, объекты которого описывают параметры салата
 * @constructor
 * @param Тип
 * @param Вес
 */
function Salad(type, weight) {
	this.type = type;
	this.weight = weight;
}
// Цена и калории за 100г.
Salad.TYPE_CAESAR = { name: 'caesar', price: 100, calories: 20 };
Salad.TYPE_OLIVE = { name: 'olivier', price: 50, calories: 80 };

// Узнать тип салата
Salad.prototype.getType = function() {
	let type = document.querySelector('input[name="addSalad"]:checked').value;
	if (type === 'caesar') {
		return Salad.TYPE_CAESAR
	} else {
		return Salad.TYPE_OLIVE
	}
};

// Узнать вес салата
Salad.prototype.getWeight = function() {
	let type = document.querySelector('input[name="addSalad"]:checked').value;
	if (type === 'caesar') {
		return document.getElementById('caesarWeight').value
	} else {
		return document.getElementById('olivWeight').value
	}
}

// Узнать цену по количеству грамм
Salad.prototype.calculatePrice = function(salad) {
	let pricePerGram = (salad.type.price / 100).toFixed(2);
	return pricePerGram * salad.weight
}
// Узнать калорийность по количеству грамм
Salad.prototype.calculateCalories = function(salad) {
	let caloriesPerGram = (salad.type.calories / 100).toFixed(2);
	return caloriesPerGram * salad.weight;
}

Salad.prototype.addSaladToOrder = () => {
	let type = Salad.prototype.getType();
	let weight = Salad.prototype.getWeight();
	let salad = new Salad(type, weight);
	let resultPrice = Salad.prototype.calculatePrice(salad);
	let resultCalories = Salad.prototype.calculateCalories(salad);
	let name = salad.type.name;
	Order.prototype.render(name, resultPrice, resultCalories);
}

/**
 * Класс, параметры которого описывают напиток
 * @constructor
 * @param Тип
 */
function Drink(type) {
	this.type = type;
}

Drink.TYPE_PEPSI = { name: 'pepsi', price: 50, calories: 40 };
Drink.TYPE_COFFEE = { name: 'arabica', price: 80, calories: 20 };

// Узнать тип напитка
Drink.prototype.getType = function() {
	let type = document.querySelector('input[name="addDrink"]:checked').value;
	if (type === 'pepsi') {
		return Drink.TYPE_PEPSI
	} else {
		return Drink.TYPE_COFFEE
	}
};

Drink.prototype.addDrinkToOrder = () => {
	let type = Drink.prototype.getType();
	let drink = new Drink(type);
	let resultPrice = drink.type.price;
	let resultCalories = drink.type.calories;
	let name = drink.type.name;
	Order.prototype.render(name, resultPrice, resultCalories);
}

/**
 * Класс, обхекты которого описывают заказ
 * @constructor
 * @param items Позоции заказа
 */
function Order() {
	this.items = [];
}
/**
 * Получить список позиций в заказе
 */
Order.prototype.getItems = function() {
	return this.items;
}

function calculateSum(inp,tr ) {
	if (inp.tagName === 'INPUT') {
		tr.querySelector('.total-price').textContent = tr.querySelector('.price').textContent * inp.value;
		tr.querySelector('.total-calories').textContent = (tr.querySelector('.calories').textContent * inp.value).toFixed(2);
	}
}

function totalPrice() {
	let table = document.getElementById('order-table').getElementsByTagName('tr');
	let sum = 0;
	for(let i = 0; i < table.length; i++) {
		if(table[i].querySelector('.total-price') && table[i].querySelector('.total-price').textContent) {
			sum +=parseInt(table[i].querySelector('.total-price').textContent);
		}	  
	}
	return sum;
}
function totalCalories() {
	let table = document.getElementById('order-table').getElementsByTagName('tr');
	let calories = 0;
	for(let i = 0; i < table.length; i++) {
		if(table[i].querySelector('.total-calories') && table[i].querySelector('.total-calories').textContent) {
			calories +=parseInt(table[i].querySelector('.total-calories').textContent);
		}	  
	}
	return calories;
}
// getTotalResult
document.getElementById('order-table').addEventListener('input', function (e) {
	let inp = e.target;
	let tr = inp.parentElement.parentElement;
	calculateSum(inp, tr);
	document.getElementById('totalPrice').textContent = totalPrice();
	document.getElementById('totalCalories').textContent = totalCalories();
});

// makeOrder
let orderBtn = document.querySelector('.submit');
orderBtn.addEventListener('click', function(e){
	let form = document.getElementById('form')
	let allElements = form.elements;
	for (let i = 0, l = allElements.length; i < l; ++i) {
		allElements[i].disabled=true;
	}
	let markup = `<p>We started to cook your order. To make a new one press F5</p>`
	form.insertAdjacentHTML('beforeend',markup);
});

let order = new Order();