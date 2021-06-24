export default class Position {
  constructor(type = { name: 'unknown', price: 0, calories: 0 }) {
    this.type = type;
  }

  toString() {
    return `${this.getName()}`;
  }

  getName() {
    return this.type.name;
  }

  calculatePrice() {
    return this.type.price;
  }

  calculateCalories() {
    return this.type.calories;
  }
}
