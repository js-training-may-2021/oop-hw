class Product {
  constructor(price, calories) {
    this.price = price;
    this.calories = calories;
  }

  calculatePrice() {
    return this.price;
  }

  calculateCalories() {
    return this.calories;
  }
}

class Cheese extends Product {
  constructor() {
    super(10, 20);
  }
}

class SaladLeaf extends Product {
  constructor() {
    super(20, 5);
  }
}

class Potato extends Product {
  constructor() {
    super(15, 10);
  }
}

class Cola extends Product {
  constructor() {
    super(50, 40);
  }
}

class Coffee extends Product {
  constructor() {
    super(80, 20);
  }
}

class Salad extends Product {
  constructor(price, calories, weight) {
    super(price, calories);

    this.weight = weight;
  }

  calculatePrice() {
    return (super.calculatePrice() * this.weight) / 100;
  }

  calculateCalories() {
    return (super.calculateCalories() * this.weight) / 100;
  }
}

class Ceasar extends Salad {
  constructor(weight = 100) {
    super(100, 20, weight);
  }
}

class RussianSalad extends Salad {
  constructor(weight = 100) {
    super(50, 80, weight);
  }
}

class Burger extends Product {
  constructor(size = Burger.SIZE_SMALL, stuffing = [Burger.STUFFING_CHEESE]) {
    super();

    this.size = size;
    this.stuffing = stuffing;
    this.price = this.calculatePrice();
    this.calories = this.calculateCalories();
  }

  static SIZE_SMALL = new Product(50, 20);
  static SIZE_LARGE = new Product(100, 40);
  static STUFFING_CHEESE = new Cheese();
  static STUFFING_SALAD = new SaladLeaf();
  static STUFFING_POTATO = new Potato();

  calculatePrice() {
    const stuffingPrice = this.stuffing.reduce((sum, stuffing) => {
      return sum + stuffing.calculatePrice();
    }, 0);

    const burgerPrice = this.size.calculatePrice();
    const price = burgerPrice + stuffingPrice;
    return price;
  }

  calculateCalories() {
    const stuffingCalories = this.stuffing.reduce((sum, stuffing) => {
      return sum + stuffing.calculateCalories();
    }, 0);

    const burgerCalories = this.size.calculateCalories();
    const calories = burgerCalories + stuffingCalories;
    return calories;
  }
}

class Order {
  constructor() {
    this.products = [];
    this.status = 'initial';
  }

  addProduct(product) {
    if (this.status === 'initial') {
      this.products.push(product);
    } else {
      throw new Error("You can't add a product after payment.");
    }
  }

  removeProduct(product) {
    if (this.status === 'initial') {
      this.products = this.products.filter(p => p !== product);
    } else {
      throw new Error("You can't remove a product after payment.");
    }
  }

  calculatePrice() {
    return this.products.reduce(
      (sum, product) => sum + product.calculatePrice(), 0);
  }

  calculateCalories() {
    return this.products.reduce(
      (sum, product) => sum + product.calculateCalories(), 0);
  }

  buy() {
    if (this.status === 'initial') {
      this.status = 'finished';
    } else {
      throw new Error("You can't buy an order after payment.")
    }
  }
  
  getProducts() {
    return this.products;
  }
}

module.exports = { Burger, Order, Ceasar, RussianSalad, Cola, Coffee, Cheese };
