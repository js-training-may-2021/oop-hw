function FoodCreator(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
}

FoodCreator.prototype.calculatePrice = function() {
    console.log('Цена: ' + this.price);
    return this.price;
}

FoodCreator.prototype.calculateCalories = function() {
    console.log('Калорийность: ' + this.calories);
    return this.calories;
}


function BurgerCreator(size, stuffing) {
    FoodCreator.call(this, 'Гамбургер', size.price + stuffing.price, size.calories + stuffing.calories);
    this.size = size.name;
    this.stuffing = stuffing.name;
}

BurgerCreator.prototype = Object.create(FoodCreator.prototype);

BurgerCreator.prototype.getSize = function() {
    console.log('Размер: ' + this.size);
    return this.size;
}

BurgerCreator.prototype.getStuffing = function() {
    console.log('Начинка бургера: ' + this.stuffing);
    return this.stuffing;
}

BurgerCreator.SIZE_SMALL = {
    name: 'Маленький',
    price: 50,
    calories: 20
}
BurgerCreator.SIZE_LARGE = {
    name: 'Большой',
    price: 100,
    calories: 40
}
BurgerCreator.STUFFING_CHEESE = {
    name: 'Сыр',
    price: 10,
    calories: 20
}
BurgerCreator.STUFFING_SALAD = {
    name: 'Салат',
    price: 20,
    calories: 5
}
BurgerCreator.STUFFING_POTATO = {
    name: 'Картошка',
    price: 15,
    calories: 10
}


function SaladCreator(name, gramms) {
    FoodCreator.call(this, 'Салат', gramms / 100 * name.price, gramms / 100 * name.calories);
    this.name = name.name;
}

SaladCreator.prototype = Object.create(FoodCreator.prototype);

SaladCreator.prototype.getName = function() {
    console.log('Название салата - ' + this.name);
}

SaladCreator.CAESAR = {
    name: 'Цезарь',
    price: 100,
    calories: 20
}
SaladCreator.RUSSIAN_SALAD = {
    name: 'Оливье',
    price: 50,
    calories: 80
}


function DrinkCreator(name) {
    FoodCreator.call(this, 'Напиток', name.price, name.calories);
    this.name = name.name;
}

DrinkCreator.prototype = Object.create(FoodCreator.prototype);

DrinkCreator.prototype.getName = function() {
    console.log('Название напитка - ' + this.name);
}

DrinkCreator.COKE = {
    name: 'Кола',
    price: 50,
    calories: 40
}
DrinkCreator.COFFEE = {
    name: 'Кофе',
    price: 80,
    calories: 20
}


function Order() {
    this.positions = [];
}

Order.prototype.addFood = function(...food) {
    if (Object.isFrozen(this)) {
        console.log('Вы уже оплатили заказ!');
        return this;
    }
    for (let i = 0; i < food.length; i++) {
        this["positions"].push(food[i]);
    }
}

Order.prototype.removeFood = function(...food) {
    if (Object.isFrozen(this)) {
        console.log(' Вы уже оплатили заказ!');
        return this;
    }
    for (let i = 0; i < food.length; i++) {
        if (this["positions"].includes(food[i])) {
            this["positions"].splice(this["positions"].indexOf(food[i]), 1);
        } else {
            console.log('Позиции нет в заказе!');
        }
    }
}

Order.prototype.showOrder = function() {
    console.log('Ваш заказ: ');
    for (let i = 0; i < this['positions'].length; i++) {
        let position = this["positions"][i];
        let string = String(position.name) + ' ' + String(position.price) + ' тугриков';
        console.log(string);
    }
}

Order.prototype.calculateSumPrice = function() {
    let price = 0;
    for (let i = 0; i < this["positions"].length; i++) {
        let pos = this["positions"][i];
        price += pos.price;
    }
    console.log('Сумма заказа: ' + price + ' тугриков');
}

Order.prototype.calculateSumCalories = function() {
    let calories = 0;
    for (let i = 0; i < this["positions"].length; i++) {
        let pos = this["positions"][i];
        calories += pos.calories;
    }
    console.log(' Калорийность заказа: ' + calories + ' калорий');
}

Order.prototype.pay = function() {
    var object = Object.freeze(this);
    console.log('Заказ оплачен');
    return object;
}

let order1 = new Order();

let burger = new BurgerCreator(BurgerCreator.SIZE_SMALL, BurgerCreator.STUFFING_CHEESE);
burger.calculatePrice();
burger.getStuffing();

let salad = new SaladCreator(SaladCreator.CAESAR, 150);
salad.calculateCalories();
salad.getName();

let drink = new DrinkCreator(DrinkCreator.COFFEE);
let drink2 = new DrinkCreator(DrinkCreator.COKE);

drink.calculateCalories();

order1.addFood(burger, salad, drink, drink2);
order1.showOrder();

order1.removeFood(drink);
order1.removeFood(drink);
order1.showOrder();

order1.calculateSumCalories();
order1.calculateSumPrice();

order1.pay();

let drink3 = new DrinkCreator(DrinkCreator.COKE);
order1.addFood(drink3);
order1.showOrder();