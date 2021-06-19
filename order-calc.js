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

  SIZE_SMALL = new BaseProduct('small', 50, 20);
  SIZE_LARGE = new BaseProduct('large', 100, 40);
  STUFFING_CHEESE = new BaseProduct('cheese', 10, 20);
  STUFFING_SALAD = new BaseProduct('salad', 20, 5);
  STUFFING_POTATO = new BaseProduct('potato', 15, 10);
}

class Salad {
  constructor(name, weight) {
    if (name === this.CEASAR.name) {
      this.name = this.CEASAR;
    } else if (name === this.RUSSIAN.name) {
      this.name = this.RUSSIAN;
    } else {
      throw new Error('No such salad in the menu');
    }

    this.weight = weight;
    this.price = this.name.price * (this.weight/this.priceForWeight);
    this.calories = this.name.calories * (this.weight/this.priceForWeight);
  }

  CEASAR = new BaseProduct('caesar', 100, 20);
  RUSSIAN = new BaseProduct('russian', 50, 80);
  priceForWeight = 100;
}

class Drink {
  constructor(name) {
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

  COLA = new BaseProduct('cola', 50, 40);
  COFFEE = new BaseProduct('coffee', 80, 20);
}

class Order {
  constructor(order) {
    this.list = order;
    this.paid = false;
  }

  totalPrice() {
    return 'Total price:' + this.list.reduce( (acc, value) => acc + value.price, 0);
  }
  
  totalCalories() {
    return 'Total calories:' + this.list.reduce( (acc, value) => acc + value.calories, 0);
  }

  addProduct(product) {
    if (this.paid) {
      throw new Error('You can\'t edit a paid order');
    }
    this.list.push(product);
    return this;
  }

  removeProduct(productType, option1 = null, option2 = null) {
    if (this.paid) {
      throw new Error('You can\'t edit a paid order');
    }

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
    this.paid = true;
    Object.freeze(this);
    Object.freeze(this.list);
    this.list.forEach( item => Object.freeze(item));
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



