/**
 * Класс, объекты которого описывают параметры элемента меню.
 *
 * @constructor
 * @param name Наименование товара
 * @param measureUnit Единица для расчета стоимости
 * @param cost Цена за 1 единицу товара
 * @param calories Калории на 1 единицу товара
 */

class MenuItem{
    constructor(name, measureUnit, cost, calories) {
        this.name = name;
        this.measureUnit = measureUnit;
        this.cost = cost;
        this.cals = calories;
    }
    /**
     * Получить стоимость элемента меню
     */
    get price(){
        return this.cost * this.measureUnit;
    }
    /**
     * Получить калорийность элемента меню
     */
    get calories(){
        return this.cals * this.measureUnit;
    }
    /**
     * Получить данные об элементе меню
     */
    get description(){
        return `${this.name} \nPrice: ${this.price} tugrics, Calories: ${this.calories} kal.`
    }
    /**
     * Вывести данные элемента меню в консоль (читабельно)
     */
    printDescription(){
        return console.log(this.description);
    }
}

module.exports = {
    MenuItem: MenuItem
};