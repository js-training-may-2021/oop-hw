export default class Position {
  #type;

  constructor(type = { name: 'unknown', price: 0, calories: 0 }) {
    this.#type = type;
  }

  toString() {
    return `${this.getType()}`;
  }

  getType() {
    return this.#type.name;
  }

  calculatePrice() {
    return this.#type.price;
  }

  calculateCalories() {
    return this.#type.calories;
  }
}
