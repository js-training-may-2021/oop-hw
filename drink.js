import Food from './food.js'

export default class Drink extends Food {
    constructor(type) {
        super(type)
        // this.name = type.name,
        // this.price = type.price,
        // this.calories = type.calories;
    }
}

Drink.TYPE_COLA = { name: 'coca-cola', price: 50, calories: 40 };
Drink.TYPE_COFFEE = { name: 'nescafe', price: 80, calories: 20 };

// let drink = new Drink(Drink.TYPE_COLA);
// console.log(drink.calculatePrice())
// console.log(drink)