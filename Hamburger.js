const MenuItem = require('./MenuItem').MenuItem;
// const Stuffing = require('./Stuffing').Stuffing;

/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param name        Наименование гамбургера
 * @param cost        Стоимость
 * @param calories    Калорийность
 * @param stuffing    Начинка
 */

class Hamburger extends MenuItem {
    constructor(name, cost, calories, stuffing) {
        super(name, 1, cost, calories)
        this.currentStuffing = stuffing;
    }
    /**
     * Получить стоимость гамбургера с учётом его размера и начинки
     */
    get price() {
        return this.cost / this.measureUnit + this.currentStuffing.price;
    }
    /**
     * Получить калорийность гамбургера с учётом его размера и начинки
     */
    get calories() {
        return this.cals / this.measureUnit + this.currentStuffing.calories;
    }
    /**
     * Получить текущую начинку гамбургера
     */
    get stuffing() {
        return this.currentStuffing;
    }
    /**
     * Изменить текущую начинку гамбургера
     */
    set stuffing(value) {
        return this.currentStuffing = value;
    }
    /**
     * Получить наименование, начинку, калорийность и цену гамбургера
     */
    get description() {
        return `${this.name} with ${this.currentStuffing.description}\nPrice: ${this.price} tugrics, Calories: ${this.calories} kal.`;
    }


}

/*
* Прим.: no typo in 'gigabite', it's a wordplay
* */

module.exports = {
    Hamburger: Hamburger
};