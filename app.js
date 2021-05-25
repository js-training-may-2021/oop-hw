function Menu(name) {
    this.name = name;
}

Menu.prototype.calculatePrice = function() {
    return this.name.price;
}

Menu.prototype.calculateCalories = function() {
    return this.name.calories;
}

function Hamburger(name, ...stuffing) { 
    Menu.call(this, name);
    this.stuffing = stuffing;
} 

Hamburger.SIZE_SMALL = { type: 'small', price: 50, calories: 20 };
Hamburger.SIZE_LARGE = { type: 'large', price: 100, calories: 40 };
Hamburger.STUFFING_CHEESE = { type: 'cheese', price: 10, calories: 20 };
Hamburger.STUFFING_SALAD = { type: 'salad', price: 20, calories: 5 };
Hamburger.STUFFING_POTATO = { type: 'potato', price: 15, calories: 10 };

Hamburger.prototype = Object.create(Menu.prototype);

Hamburger.prototype.calculatePrice = function () {
    let count_stuff = 0;

    for (item in this.stuffing) {
        count_stuff += this.stuffing[item].price;
    };

    return this.name.price+count_stuff;
}

Hamburger.prototype.calculateCalories = function () {
    let hamburger_calories = 0;

    for (item in this.stuffing) {
        hamburger_calories += this.stuffing[item].calories;
    }

    return hamburger_calories+this.name.calories;
}

function Salad(name, weight) {
    Menu.call(this, name);
    this.weight = weight;
}

Salad.CAESAR = {type: 'caesar', price: 100, calories: 20};
Salad.OLIVIE = {type: 'olivie', price: 50, calories: 80};

Salad.prototype = Object.create(Menu.prototype);

Salad.prototype.calculatePrice = function() {
    return this.weight*this.name.price*0.01;
}

Salad.prototype.calculateCalories = function() {
    return this.weight*this.name.calories*0.01;
}

function Drink(name) {
    Menu.call(this, name);
}

Drink.COKE = {type: 'coke', price: 50, calories: 40};
Drink.COFFEE = {type: 'coffee', price: 80, calories: 20};

Drink.prototype = Object.create(Menu.prototype);

function Order(...item) {
    this.item = item;
}

Order.prototype.calculateTotalPrice = function() {
    let totalPrice = 0;

    for (item in this.item) {
        totalPrice += this.item[item].calculatePrice();
    }

    return totalPrice;
}

Order.prototype.calculateTotalCalories = function() {
    let totalCalories = 0;

    for (item in this.item) {
        totalCalories += this.item[item].calculateCalories();
    }

    return totalCalories;
}

let payed = false;

Order.prototype.deleteItem = function(position) {

    if (!payed) {
        if(this.item.some(elem => elem === position)) {
            this.item.splice(this.item.indexOf(position), 1);
        } else {
            console.log('You have no this position in your order');
        }
    } else {
        console.log('You can not change your order after payment')
    }
    
    return this.item;
}

Order.prototype.addItem = function(position) {

    if (!payed) {
        if(!this.item.some(elem => elem === position)) {
            this.item.push(position);     
        } else {
            console.log('You already have this position in your order');
        }
    } else {
        console.log('You can not change your order after payment')
    }
    
    return this.item;
}


let item1 = new Drink(Drink.COKE);
let item2 = new Drink(Drink.COFFEE);
let item3 = new Salad(Salad.CAESAR, 200);
let item4 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_SALAD);
let item5 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);

let order = new Order(item1, item2, item3, item4);
/*order.calculateTotalPrice();
order.calculateTotalCalories();
order.deleteItem(item2);
order.addItem(item5);*/
