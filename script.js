`use strict`;

/**
* Класс, объекты которого описывают заказы 
* 
*/
function Order() {
	this._items = [];
	this._price = 0;
	this._calories = 0;
	this._isPaid = false;
} 

/**
 * Узнать, что в заказе
 * @return {Array} Массив товаров в заказе
 */
Order.prototype.getItems = function () {
	console.log(`Order: ${this._items.map(item => {
		return `${item.getName()} (Price: ${item.getPrice()}, Calories: ${item.getCalories()})`;
	}).join(`, `)}`);

	return this._items;
};

/**
 * Добавить товар в заказ
 */
Order.prototype.addItem = function (item) {
	if (!this._isPaid) {
		this._items.push(item);
		console.log(`${item.getName()} added to Order`);
	} else {
		console.log(`Order already paid for. Cannot edit.`);
	}
};

/**
 * Удалить товар из заказа
 */
Order.prototype.removeItem = function (item) {
	if (!this._isPaid) {
		let index = this._items.indexOf(item);

		if (index >= 0) {
			this._items.splice(index, 1);
			console.log(`${item.getName()} removed from Order`);
		} else {
			console.log(`Item wasn't found in this Order`);
		}
	} else {
		console.log(`Order already paid for. Cannot edit.`);
	}
};

/**
 * Посчитать цену заказа
 * @return {Number} Цена в тугриках
 */
Order.prototype.calculatePrice = function () {
	this._price = this._items.reduce((acc, curr) => {
		return acc += curr.getPrice();
	}, 0);

	console.log(`Order Total is ${this._price} tugriks`);
	return this._price;
};

/**
 * Посчитать калорийность заказа
 * @return {Number} Калорийность в калориях
 */
Order.prototype.calculateCalories = function () {
	this._calories = this._items.reduce((acc, curr) => {
		return acc += curr.getCalories();
	}, 0);

	console.log(`Order Calories is ${this._calories} calories`);
	return this._calories;
};

/**
 * Оплатить заказ
 */
Order.prototype.pay = function (money) {
	this.calculatePrice();
	
	if (money >= this._price) {
		this._isPaid = true;
		console.log(`Order is paid for. Change is ${money - this._price} tugriks`);
	} else {
		console.log(`Not enough money`);
	}
};

/**
* Класс, который описывает абстрактный товар в заказе
*/
function Item() {
	this._price = 0;
	this._calories = 0;
}

/**
 * Узнать цену товара
 * @return {Number} Цена в тугриках
 */
Item.prototype.getPrice = function () {
	return this._price ? this._price : this.calculatePrice();
};

/**
 * Узнать калорийность товара
 * @return {Number} Калорийность в калориях
 */
Item.prototype.getCalories = function () {
	return this._calories ? this._calories : this.calculateCalories();
};


/**
* Класс, объекты которого описывают параметры гамбургера
* 
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
function Hamburger(size = Hamburger.SIZE_SMALL, stuffing = Hamburger.STUFFING_CHEESE) {
	Item.call(this);
	this._size = size;
	this._stuffing = stuffing;
} 

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {
	name: `Small Hamburger`,
	price: 50,
	calories: 20,
};

Hamburger.SIZE_LARGE = {
	name: `Large Hamburger`,
	price: 100,
	calories: 40,
};

Hamburger.STUFFING_CHEESE = {
	name: `With Cheese`,
	price: 10,
	calories: 20,
};

Hamburger.STUFFING_SALAD = {
	name: `With Salad`,
	price: 20,
	calories: 5,
};

Hamburger.STUFFING_POTATO = {
	name: `With Potato`,
	price: 15,
	calories: 10,
};

/**
 * Класс Гамбургер наследует от абстрактного товара
 */
Hamburger.prototype = Object.create(Item.prototype);

/**
 * Узнать название гамбургера
 * @return {String} Название гамбургера для заказа
 */
Hamburger.prototype.getName = function () {
	return `${this._size.name} ${this._stuffing.name}`; 
};

/**
 * Посчитать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
	return this._size.price + this._stuffing.price; 
};

/**
 * Посчитать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
	return this._size.calories + this._stuffing.calories;	
};


/**
* Класс, объекты которого описывают параметры салата 
* 
* @constructor
* @param type        Вид салата
* @param weight      Вес в граммах
*/
function Salad(type = Salad.CAESAR, weight = 100) {
	Item.call(this);
	this._type = type;
	this._weight = weight;
} 

/* Виды салатов */
Salad.CAESAR = {
	name: `Caesar Salad`,
	price: 100,
	calories: 20,
};

Salad.OLIVIER = {
	name: `Olivier Salad`,
	price: 50,
	calories: 80,
};

/* Цена и калорийность указываются за 100 грамм */
Salad.MEASURE = 100;

/**
* Класс Салат наследует от абстрактного товара
*/
Salad.prototype = Object.create(Item.prototype);

/**
 * Узнать название салата
 * @return {String} Название и вес салата для заказа
 */
Salad.prototype.getName = function () {
	return `${this._type.name} ${this._weight}g`; 
};

/**
 * Посчитать цену салата
 * @return {Number} Цена в тугриках
 */
Salad.prototype.calculatePrice = function () {
	return this._type.price * (this._weight / Salad.MEASURE); 
};

/**
 * Посчитать калорийность салата
 * @return {Number} Калорийность в калориях
 */
Salad.prototype.calculateCalories = function () {
	return this._type.calories * (this._weight / Salad.MEASURE); 
};


/**
* Класс, объекты которого описывают параметры напитков
* 
* @constructor
* @param type        Вид напитка
*/
function Drink(type = Drink.COLA) {
	Item.call(this);
	this._type = type;
} 

/* Виды напитков */
Drink.COLA = {
	name: `Cola`,
	price: 50,
	calories: 40,
};

Drink.COFFEE = {
	name: `Coffee`,
	price: 80,
	calories: 20,
};

/**
* Класс Напиток наследует от абстрактного товара
*/
Drink.prototype = Object.create(Item.prototype);

/**
 * Узнать название напитка
 * @return {String} Название напитка
 */
Drink.prototype.getName = function () {
	return `${this._type.name}`; 
};

/**
 * Посчитать цену напитка
 * @return {Number} Цена в тугриках
 */
Drink.prototype.calculatePrice = function () {
	return this._type.price; 
};

/**
 * Посчитать калорийность напитка
 * @return {Number} Калорийность в калориях
 */
Drink.prototype.calculateCalories = function () {
	return this._type.calories; 
};

/**
 * Пример использования. Информация выводится в консоль.
 */
const hamburgerWithPotato = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
const hamburgerWithSalad = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);

const caesarSalad = new Salad(Salad.CAESAR, 150);
const olivierSalad = new Salad(Salad.OLIVIER, 1350);

const coffee = new Drink(Drink.COFFEE);
const cola = new Drink(Drink.COLA);

const order = new Order();

order.addItem(hamburgerWithPotato); // Добавить гамбургер
order.removeItem(hamburgerWithSalad); // Удалить товар, которого нет в заказе
order.addItem(hamburgerWithSalad); // Добавить гамбургер
order.removeItem(hamburgerWithSalad); // Удалить товар, который есть в заказе
order.addItem(caesarSalad); // Добавить Цезарь
order.addItem(olivierSalad); // Добавить Оливье
order.addItem(coffee); // Добавить два кофе
order.addItem(coffee);
order.addItem(cola); // Добавить колу
order.removeItem(caesarSalad); // Удалить Цезарь
order.getItems(); // Посмотреть, что в заказе
order.calculatePrice(); // Посчитать итоговую стоимость
order.calculateCalories(); // Посчитать калории
order.pay(60); // Оплатить заказ - мало денег
order.pay(10000); // Оплатить заказ - оплачено
order.addItem(cola); // Запрет на редактирование после оплаты
order.removeItem(cola); // Запрет на редактирование после оплаты
