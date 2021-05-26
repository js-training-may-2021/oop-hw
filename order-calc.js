'use strict'

class BaseProduct {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}

class Hamburger {
  constructor(size, stuffing) {
    this.SIZE_SMALL = new BaseProduct('small', 50, 20);
    this.SIZE_LARGE = new BaseProduct('large', 100, 40);
    this.STUFFING_CHEESE = new BaseProduct('cheese', 10, 20);
    this.STUFFING_SALAD = new BaseProduct('salad', 20, 5);
    this.STUFFING_POTATO = new BaseProduct('potato', 15, 10);

    if (size === this.SIZE_SMALL.name) {
      this.size = this.SIZE_SMALL;
    } else if (size === this.SIZE_LARGE.name) {
      this.size = this.SIZE_LARGE;
    } else {
      throw new Error('No such size in the menu');
    }

    if (stuffing === this.STUFFING_CHEESE.name) {
      this.stuffing = this.STUFFING_CHEESE;
    } else if (stuffing === this.STUFFING_SALAD.name) {
      this.stuffing = this.STUFFING_SALAD;
    } else if (stuffing === this.STUFFING_POTATO.name) {
      this.stuffing = this.STUFFING_POTATO;
    } else {
      throw new Error('No such stuffing in the menu');
    }
    
    this.price = this.size.price + this.stuffing.price;

    this.calories = this.size.calories + this.stuffing.calories;
  }
}

class Salad {
  constructor(name, weight) {
    this.CEASAR = new BaseProduct('caesar', 100, 20);
    this.RUSSIAN = new BaseProduct('russian', 50, 80);

    if (name === this.CEASAR.name) {
      this.name = this.CEASAR;
    } else if (name === this.RUSSIAN.name) {
      this.name = this.RUSSIAN;
    } else {
      throw new Error('No such salad in the menu');
    }

    this.weight = weight;
    this.price = this.name.price * (this.weight/100);
    this.calories = this.name.calories * (this.weight/100);
  }
}

class Drink {
  constructor(name) {
    this.COLA = new BaseProduct('cola', 50, 40);
    this.COFFEE = new BaseProduct('coffee', 80, 20);

    if (name === this.COLA.name) {
      this.name = this.COLA;
    } else if (name === this.COFFEE.name) {
      this.name = this.COFFEE;
    } else {
      throw new Error('No such drink in the menu');
    }

    this.price = this.name.price;
    this.calories = this.name.calories;
  }
}

class Order {
  constructor(order) {
    this.list = order;
  }

  totalPrice() {
    return 'Total price:' + this.list.reduce( (acc, value) => acc + value.price, 0);
  }
  
  totalCalories() {
    return 'Total calories:' + this.list.reduce( (acc, value) => acc + value.calories, 0);
  }

  addProduct(product) {
    this.list.push(product);
    return this;
  }

  removeProduct(productType, option1 = null, option2 = null) {
    if (option1 === null && option2 === null) {
      this.list = this.list.filter( item => !(item instanceof productType));
      return this;
    }

    if (option2 === null && option1) {
      if (productType === Hamburger) {
        this.list = this.list.filter( item => !(item instanceof productType && (option1 === item.size.name || option1 === item.stuffing.name) ));
        return this;
      } else {
        this.list = this.list.filter( item => !(item instanceof productType && option1 === item.name.name));
        return this;
      }
    }

    if (option1 && option2) {
      if (productType === Hamburger) {
        this.list = this.list.filter( item => !(item instanceof productType && option1 === item.size.name && option2 === item.stuffing.name) );
        return this;
      }
    }

  }

  pay() {
    Object.freeze(this);
    Object.freeze(this.list);
    return this;
  }
}

// How the typical order should look:

let food = new Order([ new Hamburger('small', 'cheese'), new Hamburger('large', 'salad'), new Salad('caesar', 175), new Salad('russian', 230), new Drink('coffee'), new Drink('cola') ]);

console.log(food.totalPrice());
console.log(food.totalCalories());

food.addProduct(new Hamburger('large', 'potato'));


food.removeProduct(Salad); // Can remove the whole type of product
food.removeProduct(Hamburger, 'large', 'potato'); //or can remove particular product

console.log(food.addProduct(new Drink('cola')).addProduct(new Salad('russian', 100)).removeProduct(Drink, 'cola').totalPrice()); //chaining also works

food.pay().addProduct(new Drink('coffee')); //can't edit the order after it was paid



