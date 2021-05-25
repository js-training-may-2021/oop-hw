const MenuItem = require('./MenuItem').MenuItem;

/**
 * Класс, объекты которого описывают параметры напитка.
 *
 * @constructor
 * @param name Наименование напитка
 * @param cost Цена за напиток
 * @param calories Калорийность напитка
 */

class Beverage extends MenuItem {
    constructor(name, cost, calories) {
        super(name, 1, cost, calories);
    }
}

module.exports = {
    Beverage: Beverage
};