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

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {price: 50, calories: 20};
Hamburger.SIZE_LARGE = {price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function (hamburger) {
    return this.size;
}

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function (hamburger) {
    return this.stuffing;
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

let one = new Hamburger (Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
one.calculateCalories();
console.log(one.getSize());
