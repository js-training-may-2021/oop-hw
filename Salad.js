import Item from './Item.js';

class Salad extends Item {
  constructor(type, weight) {
    super(type);
    this.weight = weight;
  }
  getName() {
    return `${this.type.name} ${this.weight}g`;
  }
  calculatePrice() {
    return super.calculatePrice() * this.weight / 100;
  }
  calculateCalories() {
    return super.calculateCalories() * this.weight / 100;
  }
}

Salad.TYPE_CAESAR = {name: 'caesar', price: 100, calories: 20};
Salad.TYPE_RUSSIAN_SALAD = {name: 'russian salad', price: 50, calories: 80};

export default Salad;
