"use strict";

class Order {
  products = [];
  isPaid = false;
  getTotal() {
    const productsCopy = this.products.slice();
    const total = productsCopy.reduce((currentTotal, product) => {
      return currentTotal += product.price;
    }, 0);
    return total;
  };
  getCalories() {
    const productsCopy = this.products.slice();
    const calories = productsCopy.reduce((currentCalories, product) => {
      return currentCalories += product.calories;
    }, 0);
    return calories;
  };
  addProduct(product) {
    if (this.isPaid) {
      console.log("The order is already paid. No changes allowed.");
      return;
    }
    this.products.push(product);
    return this;
  };
  deleteProduct(product) {
    if (this.isPaid) {
      console.log("The order is already paid. No changes allowed.");
      return;
    }
    if (this.products.includes(product)) {
      this.products = this.products.filter(item => item !== product);
    } else {
      console.log("The product is not found in the order");
    }
    return this;
  };
  payOrder() {
    this.isPaid = true;
    console.log("The order is paid");
    return this;
  };
};

class Product {
  constructor(name) {
    this.name = name;
    this.price = this.getPrice();
    this.calories = this.getCalories();
    this.id = this.getId();
  }
  getPrice() { };
  getCalories() { };
  getId() {
    return Math.round(Math.random() * 10000);
  }
}

class Salad extends Product {

  static CAESAR = "caesar";
  static OLIVIE = "olivie";
  static CATEGORY = "salads";
  static STANDARD_SERVING = 100;

  constructor(name = Salad.CAESAR, quantity = Salad.STANDARD_SERVING) {
    super(name);
    this.category = Salad.CATEGORY;
    this.quantity = isFinite(quantity) ? quantity : Salad.STANDARD_SERVING;
    this.price = this.getPrice();
    this.calories = this.getCalories();
  }

  getPrice() {
    if (this.name === Salad.CAESAR) {
      return 100 * this.quantity / Salad.STANDARD_SERVING;
    }
    if (this.name === Salad.OLIVIE) {
      return 50 * this.quantity / Salad.STANDARD_SERVING;
    }
  }

  getCalories() {
    if (this.name === Salad.CAESAR) {
      return 20 * this.quantity / Salad.STANDARD_SERVING;
    }
    if (this.name === Salad.OLIVIE) {
      return 80 * this.quantity / Salad.STANDARD_SERVING;
    }
  }

  getId() {
    return `${Salad.name}${super.getId()}`;
  }

}

class Drink extends Product {

  static COLA = "cola";
  static COFFEE = "coffee";
  static CATEGORY = "drinks";

  constructor(name = Drink.COLA) {
    if (name.toLowerCase() === Drink.COLA) {
      super(Drink.COLA);
    }
    if (name.toLowerCase() === Drink.COFFEE) {
      super(Drink.COFFEE);
    }
    this.category = Drink.CATEGORY;
  }

  getPrice() {
    if (this.name === Drink.COLA) return 50;
    if (this.name === Drink.COFFEE) return 80;
  }

  getCalories() {
    if (this.name === Drink.COLA) return 40;
    if (this.name === Drink.COFFEE) return 20;
  }

  getId() {
    return `${Drink.name}${super.getId()}`;
  }

}

class Hamburger extends Product {

  static SIZE_SMALL = "small";
  static SIZE_LARGE = "large";
  static STUFFING_CHEESE = "cheese";
  static STUFFING_SALAD = "salad";
  static STUFFING_POTATO = "potato";
  static CATEGORY = "hamburgers";
  static NAME = "hamburger";

  constructor(size = Hamburger.SIZE_SMALL, stuffing = Hamburger.STUFFING_CHEESE) {
    super(Hamburger.NAME);
    this.category = Hamburger.CATEGORY;
    if (size.toLowerCase() === "small" || size.toLowerCase() === "regular") {
      this.size = Hamburger.SIZE_SMALL;
    }
    if (size.toLowerCase() === "big" || size.toLowerCase() === "large") {
      this.size = Hamburger.SIZE_LARGE;
    }
    if (stuffing.toLowerCase() === "cheese") {
      this.stuffing = Hamburger.STUFFING_CHEESE;
    }
    if (stuffing.toLowerCase() === "salad") {
      this.stuffing = Hamburger.STUFFING_SALAD;
    }
    if (stuffing.toLowerCase() === "potato") {
      this.stuffing = Hamburger.STUFFING_POTATO;
    }
    this.id = this.getId();
    this.price = this.getPrice();
    this.calories = this.getCalories();
  }

  getPrice() {
    let totalPrice = 0;
    if (this.size === Hamburger.SIZE_SMALL) {
      totalPrice += 50;
    }
    if (this.size === Hamburger.SIZE_LARGE) {
      totalPrice += 100;
    }
    if (this.stuffing === Hamburger.STUFFING_CHEESE) {
      totalPrice += 10;
    }
    if (this.stuffing === Hamburger.STUFFING_SALAD) {
      totalPrice += 20;
    }
    if (this.stuffing === Hamburger.STUFFING_POTATO) {
      totalPrice += 15;
    }
    return totalPrice;
  }

  getCalories() {
    let totalCalories = 0;
    if (this.size === Hamburger.SIZE_SMALL) {
      totalCalories += 20;
    }
    if (this.size === Hamburger.SIZE_LARGE) {
      totalCalories += 40;
    }
    if (this.stuffing === Hamburger.STUFFING_CHEESE) {
      totalCalories += 20;
    }
    if (this.stuffing === Hamburger.STUFFING_SALAD) {
      totalCalories += 5;
    }
    if (this.stuffing === Hamburger.STUFFING_POTATO) {
      totalCalories += 10;
    }
    return totalCalories;
  }

  getId() {
    return `${Hamburger.NAME}${super.getId()}`;
  }

};

const order = new Order();

const salad = new Salad("olivie", 150);
const salad1 = new Salad();
const drink = new Drink("coffee");
const drink1 = new Drink("COffee");
const burger = new Hamburger("large", "cheese");
const burger1 = new Hamburger("Big", "POtaTo");

console.log(order.addProduct(burger1).addProduct(drink1).getTotal());