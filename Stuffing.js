/**
 * Класс, объекты которого описывают параметры начинки.
 *
 * @constructor
 * @param name Наименование начинки
 * @param cost Цена за начинку
 * @param calories Калорийность начинки
 */

class Stuffing{
    constructor(name, cost, calories) {
        this.name = name;
        this.cost = cost;
        this.cals = calories;
    }
    /**
     * Получить стоимость начинки
     */
    get price(){
        return this.cost;
    }
    /**
     * Получить калорийность начинки
     */
    get calories(){
        return this.cals;
    }
    /**
     * Получить наименование начинки
     */
    get description(){
        return `${this.name}`
    }
}

module.exports = {
    Stuffing: Stuffing
};