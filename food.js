export default class Food {
    constructor(type){
        this.name = type.name,
        this.price = type.price,
        this.calories = type.calories
    }
    calculateCalories() {
        return this.calories
    }
    calculatePrice() {
        return this.price
    }
}