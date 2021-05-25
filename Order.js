const Hamburger = require('./Hamburger').Hamburger,
    Beverage = require('./Beverage').Beverage,
    Salad = require('./Salad').Salad,
    Stuffing = require('./Stuffing').Stuffing;

/**
 * Класс, объекты которого описывают параметры заказа.
 *
 * @constructor
 * @param ...items Элементы заказа
 */

class Order {
    constructor(...items) {
        this.items = items;
        this.isPaid = false;
    }

    /**
     * Оплатить заказ
     */
    pay() {
        return this.isPaid = true;
    }

    /**
     * Удалить позицию из заказа
     */
    removeItem(showedItemIndex) {
        if (this.isPaid) {
            throw new Error('The item cannot be deleted when the order is paid!');
        } else {
            let indexOfItemToRemove = showedItemIndex - 1;
            if (indexOfItemToRemove < 0 || indexOfItemToRemove >= this.items.length) {
                throw new Error('Order number is out of the order range.');
            } else {
                this.items.splice(indexOfItemToRemove, 1);
            }
        }
    }

    /**
     * Добавить позицию в заказа
     */
    addItem(item) {
        if (this.isPaid) {
            throw new Error('The item cannot be added when the order is paid!');
        } else {
            this.items.push(item);
        }
    }

    /**
     * Получить все позиции заказа
     */
    getItems() {
        return this.items;
    }

    /**
     * Получить детали заказа
     */
    description() {
        if (this.getItems().length === 0) {
            return 'Order is empty.'
        }
        let result = '',
            items = this.getItems();

        for (let i = 0; i < items.length; i++) {
            let counter = i + 1
            result += `${counter}) ${items[i].description}\n`;
        }
        return result += `\n Total price: ${this.calculatePrice()} tugrics\n Total calories: ${this.calculateCalories()} kal.`;
    }

    /**
     * Вывести детали заказа в консоль (читабельно)
     */
    printDescription() {
        return console.log(this.description());
    }

    /**
     * Рассчитать цену заказа
     */
    calculatePrice() {
        let orderItems = this.getItems();
        let price = 0;
        for (let orderItem of orderItems) {
            price += orderItem.price;
        }
        return price;
    }

    /**
     * Рассчитать калорийнсть заказа
     */
    calculateCalories() {
        let orderItems = this.getItems();
        let calories = 0;
        for (let orderItem of orderItems) {
            calories += orderItem.calories;
        }
        return calories;
    }
}
