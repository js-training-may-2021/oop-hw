import Food from './food.js'

export default class Salad extends Food{
    constructor(type, weight) {
        super(type)
        this.weight = weight;
    }
    calculateCalories() {
        return super.calculateCalories() / 100 * this.weight
    }
    calculatePrice() {
        return super.calculatePrice() / 100 * this.weight;
    }
}

Salad.TYPE_CAESAR = { name: 'caesar', price: 100, calories: 20};
Salad.TYPE_OLIVIE = { name: 'olivie', price: 50, calories: 80};

// let salad = new Salad(Salad.TYPE_OLIVIE,300)
// console.log(salad.calculateCalories())
// console.log(salad.calculatePrice())
// console.log(salad)