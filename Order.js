import Hamburger from './Hamburger.js';
import Salad from './Salad.js';
import Drink from './Drink.js';

export default class Order {
  constructor(...positions) {
    this.order = positions;
    this.paid = false;
  }

  getPositions() {
    return this.order.join('\n');
  }

  calculatePrice() {
    return this.order.reduce((acc, item) => (acc += item.calculatePrice()), 0);
  }

  calculateCalories() {
    return this.order.reduce(
      (acc, item) => (acc += item.calculateCalories()),
      0
    );
  }

  addPosition(position) {
    if (this.paid) {
      return `Sorry, your order was paided. You can't add new position`;
    }
    this.order.push(position);
    return `Position was added!`;
  }

  removePosition(positionIndex) {
    const arrIndex = positionIndex - 1;
    if (this.paid) {
      return `Sorry, your order was paided. You can't remove any position`;
    }
    if (!this.order.includes(this.order[arrIndex])) {
      return `Sorry, your order doesn't have that position`;
    }
    this.order.splice(arrIndex, 1);
    return `Position was removed!`;
  }

  isPaid() {
    return this.paid ? 'Order was paided' : `Order wasn't paided`;
  }

  payOrder() {
    this.paid = true;
    Object.freeze(this);
    Object.freeze(this.order);
    return 'Order is paided';
  }
}

// FOR EXAMPLE
// const item1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// const item2 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
// const item3 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);
// const item4 = new Salad(Salad.TYPE_CAESAR, 150);
// const item5 = new Drink(Drink.TYPE_COLA);
// const order1 = new Order(item1, item2, item4, item5);

// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.addPosition(item3));
// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.addPosition(item5));
// console.log(`------------------------`);
// console.log(order1.addPosition(item3));
// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.removePosition(6));
// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.removePosition(2));
// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.removePosition(-2));
// console.log(`------------------------`);
// console.log(order1.isPaid());
// console.log(`------------------------`);
// console.log(order1.payOrder());
// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.addPosition(item3));
// console.log(`------------------------`);
// console.log(order1.removePosition(2));
// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.calculateCalories());
// console.log(`------------------------`);
// console.log(order1.calculatePrice());
// console.log(`------------------------`);
// console.log(order1.removePosition(2));
// console.log(`------------------------`);
// console.log(order1.getPositions());
// console.log(`------------------------`);
// console.log(order1.calculateCalories());
// console.log(`------------------------`);
// console.log(order1.calculatePrice());
