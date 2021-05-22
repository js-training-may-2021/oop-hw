import Hamburger from './hamburger.js';
import Drink from './drink.js';
import Salad from './salad.js';

class Order {
    constructor(...meals) {
        this.meals = [...meals],
        this.isPaid = false;
    }
    getPaid() {
        return this.isPaid;
    }
    getMeals() {
        return this.meals;
    }
    calculateTotalCalories() {
        let currentOrder = this.getMeals();
        if (currentOrder.length > 0) {
            let totalCalories = 0;
            for (let i = 0; i < currentOrder.length; i++) {
                totalCalories += currentOrder[i].calculateCalories();
            }
        return totalCalories;
        } else {
            console.log('Nothing ordered yet: calories = 0')
        }
    }
    calculateTotalPrice() {
        let currentOrder = this.getMeals();
        if (currentOrder.length > 0) {
            let totalPrice = 0;
            for (let i = 0; i < currentOrder.length; i++) {
                totalPrice += currentOrder[i].calculatePrice();
            }
        return totalPrice;
        } else {
            console.log('Nothing ordered yet: price = 0')
        }
    }
    addTheMeal(item) {
        if(!this.getPaid()) {
            return this.meals.push(item)
        } else {
           console.log('Can not add the meal. Order was already paid')
        }
    }
    deleteTheMeal(item) {
        if(!this.getPaid()) {
            let mealIndex = this.getMeals().indexOf(item)
            return this.getMeals().splice(mealIndex, 1)
        } else {
           console.log('Can not delete the meal. Order was already paid')
        }
    }
    payTheBill() {
        this.isPaid = true;
    }
}



let item1 = new Hamburger(Hamburger.SIZE_BIG, Hamburger.STUFFING_SALAD)
let item2 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE)
let item3 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD)
let item4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO)

let item5 = new Salad(Salad.TYPE_CAESAR, 100)
let item6 = new Salad(Salad.TYPE_OLIVIE, 100)
let item7 = new Salad(Salad.TYPE_CAESAR, 500)
let item8 = new Salad(Salad.TYPE_CAESAR, 300)

let item9 = new Drink(Drink.TYPE_COLA)
let item10 = new Drink(Drink.TYPE_COFFEE)



let order = new Order(item1, item3, item8, item10)
console.log(order.getMeals())

order.addTheMeal(item9)
order.deleteTheMeal(item10)
order.deleteTheMeal(item9)

console.log(order.getMeals());

console.log(order.calculateTotalCalories())
console.log(order.calculateTotalPrice())

order.payTheBill()
order.addTheMeal(item5)
order.deleteTheMeal(item5)

console.log(order.getMeals())

