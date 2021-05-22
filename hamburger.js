import Food from './food.js'

export default class Hamburger extends Food{
    constructor(size, stuffing) {
        super(size)
        this.stuffing = stuffing;
    }
    getSize() {
        return this.size.name;
    }
    getStuffing() {
        return this.stuffing.name;
    }
    calculateCalories() {
        return super.calculateCalories() + this.stuffing.calories
    }
    calculatePrice() {
        return super.calculatePrice() + this.stuffing.price
    }
}

Hamburger.SIZE_SMALL = { name: 'small', price: 50, calories: 20 };
Hamburger.SIZE_BIG = { name: 'big', price: 100, calories: 40 };

Hamburger.STUFFING_CHEESE = { name: 'cheese', price: 10, calories: 20 };
Hamburger.STUFFING_SALAD = { name: 'salad', price: 20, calories: 5 };
Hamburger.STUFFING_POTATO = { name: 'potato', price: 15, calories: 10 };

// let hamburger = new Hamburger(Hamburger.SIZE_BIG,Hamburger.STUFFING_POTATO)
// console.log(hamburger.calculatePrice())
// console.log(hamburger)