/**
* Класс, объекты которого описывают параметры гамбургера.
*
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/

function Hamburger(size, ...stuffing) {
    this.size = size;
    this.stuffing = stuffing;
 }
 /* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {price: 50, calories: 20};
Hamburger.SIZE_LARGE = {price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
    return this.size;
}

 // Узнать начинку гамбургера
 Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}

//Узнать цену гамбургера
Hamburger.prototype.calculatePrice = function () {
    let sum = 0;
    sum += this.getSize().price;

    for (let i = 0; i < this.getStuffing().length; i++) {
        sum += this.getStuffing()[i].price;
    }
    return sum;
}

// Узнать калорийность
Hamburger.prototype.calculateCalories = function () {
    let sum = 0;
    sum += this.getSize().calories;

    for (let i = 0; i < this.getStuffing().length; i++) {
        sum += this.getStuffing()[i].calories;
    }
    return sum;
}


 //  Класс напиток
function Drink(type) {
    this.type = type;
}

Drink.COLA = {price: 50, calories: 40};
Drink.COFFEE = {price: 80, calories: 20};

Drink.prototype.getType = function () {
    return this.type;
}

Drink.prototype.calculatePrice = function () {
    return this.getType().price;
}
Drink.prototype.calculateCalories = function () {
    return this.getType().calories;
}



// Класс салат
function Salad(type, weight) {
    this.type = type;
    this.weight = weight;
}
Salad.CEASER = {price: 100, calories: 20};
Salad.OLIVER = {price: 50, calories: 80};
//Узнать тип салата
Salad.prototype.getType = function () {
    return this.type;
}
//Узнать вес салата
Salad.prototype.getWeight = function () {
    return this.weight;
}
// Узнать калорийность салата
Salad.prototype.calculateCalories = function () {
    let sum = 0;
    sum += this.getWeight() / 100 * this.getType().calories;
    return sum;
}
// Узнать цену салата
Salad.prototype.calculatePrice = function () {
    let sum = 0;
    sum += this.getWeight() / 100 * this.getType().price;
    return sum;
}


// Сюда доббавляется заказ
function Order () {
    this.order = [];
    this.paid = false;

    this.addDish = function (thing) {
        if (!this.paid) {
            this.order.push(thing);
        }
    }

    this.removeDish = function (thing) {
        if (!this.paid) {
            for (let i of this.order) {
                if (thing.__proto__ == i.__proto__) {
                    this.order.splice(this.order[i], 1);
                }
            }
        }
    }

    this.calculatePrice = function () {
        let sum = 0;
        for (let i of this.order) {
            sum += i.calculatePrice();
        }
        return sum;
    }

    this.calculateCalories = function () {
        let sum = 0;
        for (let i of this.order) {
            sum += i.calculateCalories();
        }
        return sum;
    }

    this.pay = function () {
        this.paid = true;
    }

}
    // Сюда добавлять блюда
let order = new Order();
order.addDish(new Hamburger (Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE));
order.addDish(new Salad (Salad.CEASER, 200));
order.addDish(new Drink (Drink.COFFEE));
order.removeDish(new Hamburger (Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE));
order.pay();
order.addDish(new Drink (Drink.COFFEE));
order.addDish(new Hamburger (Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE));
console.log(order.order);
console.log(order.calculatePrice());
console.log(order.calculateCalories());

