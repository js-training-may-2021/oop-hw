//MENU

function Menu(position) {
    this.position = position;
}
 Menu.prototype.calculatePrice = function() {
     return this.position.price;
 }
 Menu.prototype.calculateCalories = function() {
    return this.position.kcal;
}
Menu.prototype.getResultTypeOfDish = function() {
    return this.position;
}

//HAMBURGER

function Hamburger(position, ...stuffing) {
    Menu.call(this, position);
    this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(Menu.prototype);
//типы бургеров(размер/начинки):
Hamburger.SIZE_SMALL = {price: 50, kcal: 20, dishType: 'Small Hamburger'};
Hamburger.SIZE_LARGE = {price: 100, kcal: 40, dishType: 'Large Hamburger'};
Hamburger.STUFFING_CHEESE = {price: 10, kcal: 20, dishType: 'cheese'};
Hamburger.STUFFING_SALAD = {price: 20, kcal: 5, dishType: 'salad'};
Hamburger.STUFFING_POTATO = {price: 15, kcal: 10, dishType: 'potato'};
//узнать размер гамбургера:
Hamburger.prototype.getSize = function() {
    return this.position;
}
//узнать начинку гамбургера:
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}
//узнать цену гамбургера - @return {Number} Цена в тугриках:
Hamburger.prototype.calculatePrice = function () {
    let stuffingPrice = 0;
    for (let i=0; i<this.stuffing.length; i++) {
        stuffingPrice += this.stuffing[i].price;
    }
    return this.position.price + stuffingPrice;
}
//узнать калорийность - @return {Number} Калорийность в калориях:
Hamburger.prototype.calculateCalories = function () {
    let stuffingKcal = 0;
    for (let i=0; i<this.stuffing.length; i++) {
        stuffingKcal += this.stuffing[i].kcal;
    }
    return this.position.kcal + stuffingKcal;
}
//узнать конечный вид гамбургера
Hamburger.prototype.getResultTypeOfDish = function() {
    let stuffingNames = [];
    for (let i=0; i<this.stuffing.length; i++) {
        stuffingNames.push(this.stuffing[i].dishType);
    }
    return {price: this.calculatePrice(), kcal: this.calculateCalories(), dishType: this.position.dishType + ' with ' + stuffingNames.join(', ')}
}

//SALAD

function Salad(position, weight) {
    Menu.call(this, position);
    this.weight = weight;
}
Salad.prototype = Object.create(Menu.prototype);
//тпы салатов:
Salad.CAESAR = {price: 100, kcal: 20, dishType: 'Caesar'};
Salad.OLIVIER = {price: 50, kcal: 80, dishType: 'Olivier'};
//узнать тип салата за 100гр:
Salad.prototype.getTypeOfSalad = function() {
    return this.position;
}
//узнать вес салата:
Salad.prototype.getWeight = function() {
    return this.weight;
}
//узнать цену салата (за вес weight) - @return {Number} Цена в тугриках:
Salad.prototype.calculatePrice = function () {
    return this.position.price * this.weight / 100;
}
//узнать калорийность салата (за вес weight) - @return {Number} Калорийность в калориях:
Salad.prototype.calculateCalories = function () {
    return this.position.kcal * this.weight / 100;
}
//узнать конечный вид салата:
Salad.prototype.getResultTypeOfDish = function() {
    return {price: this.calculatePrice(), kcal: this.calculateCalories(), dishType: this.getTypeOfSalad().dishType + ' salad ' + this.getWeight() + ' grams'} 
}

//DRINK

function Drink(position) {
    Menu.call(this, position);
}
Drink.prototype = Object.create(Menu.prototype);
//типы напитков:
Drink.COLA = {price: 50, kcal: 40, dishType: 'Cola'};
Drink.COFFEE = {price: 80, kcal: 20, dishType: 'Coffee'};
//узнать тип напитка:
Drink.prototype.getTypeOfDrink = function() {
    return this.position;
}
//calculatePrice / calculateCalories / getResultTypeOfDish - у родителя

//ORDER

function Order(...orderItems) {
    this.orderItems = orderItems;
    this.orderPaymentStatus = false;
}
//узнать оплачен ли заказ:
Order.prototype.getIsItPaid = function() {
    if (this.orderPaymentStatus === true) {
        return 'Your order has already been paid for.';
    } else {
        return 'Your order has not been paid yet.'
    }
}
//заплатить за заказ:
Order.prototype.payForTheOrder = function() {
    if (this.orderPaymentStatus === false) {
        this.orderPaymentStatus = true;
        return 'The order was paid for.';
    } else {
        return 'Your order has already been paid for.';
    }
}
//добавить позицию, если заказ не оплачен:
Order.prototype.addPosition = function(newPosition) {
    if (!this.orderPaymentStatus) {
        this.orderItems.push(newPosition);
        return `You added '${newPosition.getResultTypeOfDish().dishType}' to the order.`;
    } else {
        return 'You cannot change a paid order.';
    }
}
//удалить позицию, если она присутствует и заказ не оплачен:
Order.prototype.removePosition = function(delPosition) {
    if (!this.orderPaymentStatus) {
        if (this.orderItems.indexOf(delPosition) != -1) {
            this.orderItems.splice(this.orderItems.indexOf(delPosition), 1);
            return `You have removed '${delPosition.getResultTypeOfDish().dishType}' from the order.`;
        } else {
            return 'This item is not in the order.';
        }
    } else {
        return 'You cannot change a paid order.';
    }
}
//узнать общую сумму заказа:
Order.prototype.getTotalOrderPrise = function() {
    let total = 0;
    for (let item=0; item<this.orderItems.length; item++) {
        total += this.orderItems[item].calculatePrice();
    }
    return `Total order amount: ${total}.`;
}
//узнать общую калорийность заказа:
Order.prototype.getTotalOrderCalories = function() {
    let total = 0;
    for (let item=0; item<this.orderItems.length; item++) {
        total += this.orderItems[item].calculateCalories();
    }
    return `Total calories: ${total}.`;
}
//информация о заказе:
Order.prototype.orderInfo = function() {
    let info = 'Your order: ';
    let counter = 1;
    for (let i=0; i<this.orderItems.length; i++) {
        info += counter + '.'
        let dishName = this.orderItems[i].getResultTypeOfDish().dishType;
        info += dishName;
        counter++
        info += '; '
    }
    return info;
}


//пример работы программы:
var hamburger01 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
var hamburger02 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO,  Hamburger.STUFFING_CHEESE);
var hamburger03 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_POTATO);
var salad01 = new Salad(Salad.CAESAR, 200);
var salad02 = new Salad(Salad.OLIVIER, 50);
var drink01 = new Drink(Drink.COFFEE);
var drink02 = new Drink(Drink.COLA);

var order01 = new Order(hamburger01, salad01, drink01, drink02);
// var order02 = new Order(hamburger01, hamburger03, salad01, drink02);
// var order03 = new Order(salad01, salad02, drink01, hamburger02);

console.log(order01.orderInfo()); //информация о заказе
console.log(order01.getTotalOrderPrise()); //узнать стоимость заказа
console.log(order01.getTotalOrderCalories()); //узнать колорийность заказа
console.log(order01.getIsItPaid()); //узнать оплачен ли заказ
console.log(order01.addPosition(hamburger02)); //добавить блюдо в заказ
console.log(order01.removePosition(hamburger01)); //удалить блюдо из заказа
console.log(order01.orderInfo()); //информация о заказе
console.log(order01.getTotalOrderPrise()); //узнать стоимость заказа
console.log(order01.getTotalOrderCalories()); //узнать колорийность заказа
console.log(order01.payForTheOrder()); //заплатить за заказ
console.log(order01.addPosition(salad02)); //попытка добавить заказ после оплаты




