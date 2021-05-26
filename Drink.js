import Item from './Item.js';

class Drink extends Item {
  constructor(type) {
    super(type);
  }
  getDrink() {
    return this.type.name;
  }
}

Drink.TYPE_COKE = {name: 'coke', price: 50, calories: 40};
Drink.TYPE_COFFEE = {name: 'coffee', price: 80, calories: 20};

export default Drink;
