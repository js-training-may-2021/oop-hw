/**
* Класс, объекты которого описывают параметры гамбургера.
*
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
function Hamburger(size, ...stuffing) {
    this.size = size;
    this.stuffing = stuffing;
 }

 function Salad(type, weight) {
     this.type = type;
     this.weight = weight;
 }
 Salad.CEASER = {price: 100, calories: 20};
 Salad.OLIVER = {price: 50, calories: 80};

function Drink(type) {
    this.type = type;
}

Drink.COLA = {price: 50, calories: 40};
Drink.COFFEE = {price: 80, calories: 20};

Drink.prototype.getType = function () {
    return this.type;
}

Drink.prototype.calculatePrice = function () {
    console.log(this.getType().price);
    return this.getType().price;
}
Drink.prototype.calculateCalories = function () {
    return this.getType().calories;
}


/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {price: 50, calories: 20};
Hamburger.SIZE_LARGE = {price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return this.size;
}


//Узнать тип салата
Salad.prototype.getType = function () {
    return this.type;
}
/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}

//Узнать вес салата
Salad.prototype.getWeight = function () {
    return this.weight;
}

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
    let sum = 0;
    sum += this.getSize().price;

    for (let i = 0; i < this.getStuffing().length; i++) {
        sum += this.getStuffing()[i].price;
    }

    console.log(sum);
    return sum;
}

// Узнать цену салата
// Salad.prototype = Object.create(Hamburger.prototype);

Salad.prototype.calculatePrice = function () {
    let sum = 0;
    sum += this.getWeight() / 100 * this.getType().price;

    console.log(sum);
    return sum;
}

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
    let sum = 0;
    sum += this.getSize().calories;

    for (let i = 0; i < this.getStuffing().length; i++) {
        sum += this.getStuffing()[i].calories;
    }

    console.log(sum);
    return sum;
}

// Узнать калорийность салата
Salad.prototype.calculateCalories = function () {
    let sum = 0;
    sum += this.getWeight() / 100 * this.getType().calories;

    console.log(sum);
    return sum;
}

// let hum = new Hamburger (Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// one.calculateCalories();
// console.log(one.getSize());

let salad = new Salad (Salad.CEASER, 200);
salad.calculateCalories();

let drink = new Drink (Drink.COFFEE);
console.log(drink.calculateCalories());
