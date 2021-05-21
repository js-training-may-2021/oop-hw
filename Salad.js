import Position from './Position.js';

export default class Salad extends Position {
  #weight;
  constructor(type, weight) {
    super(type);
    this.#weight = weight;
  }

  toString() {
    return `salad ${this.getType()} ${this.#weight} gr`;
  }

  #getRatioWeigth() {
    const unit = 100;
    return this.#weight / unit;
  }

  calculatePrice() {
    return super.calculatePrice() * this.#getRatioWeigth();
  }

  calculateCalories() {
    return super.calculateCalories() * this.#getRatioWeigth();
  }
}

Salad.TYPE_CAESAR = { name: 'caesar', price: 100, calories: 20 };
Salad.TYPE_OLIVIER = { name: 'olivier', price: 50, calories: 80 };
