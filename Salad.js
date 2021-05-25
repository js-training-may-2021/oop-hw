const MenuItem = require('./MenuItem').MenuItem;

/**
 * Класс, объекты которого описывают параметры салата.
 *
 * @constructor
 * @param name Наименование салата
 * @param cost Цена за салат
 * @param calories Калорийность салата
 * @param weight Вес салата
 */

class Salad extends MenuItem {
    constructor(name, cost, calories, weight) {
        super(name, 100, cost, calories);
        this.currentWeight = weight;
    }

    /**
     * Изменить вес
     */
    set weight(value) {
        return this.currentWeight = value;
    }

    /**
     * Получить цену салата с учётом его веса
     */
    get price() {
        return this.cost / this.measureUnit * this.currentWeight;
    }

    /**
     * Получить калорийность салата с учётом его веса
     */
    get calories() {
        return this.cals / this.measureUnit * this.currentWeight;
    }

}

module.exports = {
    Salad: Salad
};