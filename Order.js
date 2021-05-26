import Hamburger from './Hamburger.js';
import Drink from './Drink.js';
import Salad from './Salad.js';

class Order {
  constructor(...order) {
    this.order = order;
    this.isPaid = false;
  }

  getOrder() {
    return this.order;
  }

  calculatePrice() {
    let endPrice = 0;
    this.order.map(item => endPrice += item.calculatePrice());
    return endPrice;
  }

  calculateCalories() {
    let endCalories = 0;
    this.order.map(item => endCalories += item.calculateCalories());
    return endCalories;
  }

  payment() {
    if (this.isPaid) {
      return 'Your order is paid!';
    }
    this.isPaid = true;
  }

  addItem(item) {
    this.isPaid ? console.log('Sorry. You cannot add anything to your order. Your order is paid!')
      : this.order.push(item);
    return this;
  }

  removeItem(item) {
    if (this.isPaid) {
      console.log('You cannot delete anything from your order. Your order is paid!');
      return;
    }
    if (this.order.length === 0) {
      console.log('Your order is empty. Nothing to delete!');
      return;
    }
    let index = this.order.indexOf(item);
    index !== -1 ? this.order.splice(index, 1) : 'Item has not been added.';
  }

}

const item1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
const item2 = new Drink(Drink.TYPE_COFFEE);
const item3 = new Salad(Salad.TYPE_CAESAR, 250);
const order = new Order(item1, item2, item3);
console.log(order.getOrder());
const item4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
order.addItem(item4);
order.removeItem(item1);
console.log(order.getOrder());
console.log(order.calculatePrice());
console.log(order.calculateCalories());
order.payment();
order.addItem(item1);
