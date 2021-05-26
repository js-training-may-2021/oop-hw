import Item from './Item.js';

class Hamburger extends Item {
  constructor(size, stuffing) {
    super(size);
    this.stuffing = stuffing;
  }
  getSize() {
    return this.size.name;
  }
  getStuffing() {
    return this.stuffing.name;
  }
  calculatePrice() {
    return super.calculatePrice() + this.stuffing.price;
  }
  calculateCalories() {
    return super.calculateCalories() + this.stuffing.calories;
  }
}

Hamburger.SIZE_SMALL = {name: 'small', price: 50, calories: 20};
Hamburger.SIZE_LARGE ={name: 'large', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'cheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: 'salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'potato', price: 15, calories: 10};

export default Hamburger;
