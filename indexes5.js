// https://github.com/lessarea/homework-5-js
// Комментарии
// Задачу необходимо решить используя ООП и ES5. Крайне желательно использование наследования и композиции.
//  Типы начинок, размеры надо сделать константами. Никаких магических строк не должно быть.


//создаем класс напиток и делаем его прототипом
function Drink(drink) {
    this.calories = drink.calories;
    this.price = drink.price;
}

Drink.COLA = {
    'price': 50,
    'calories': 40
}

Drink.COFFEE = {
    'price': 80,
    'calories': 20
}
Drink.prototype.calculatePrice = function () {
    return this.price;
}

Drink.prototype.calculateCalories = function () {
    return this.calories;
}

function Salad(salad, weight) {
    Drink.call(this, salad)
    this.weight = weight || 100;
}

Salad.prototype.calculatePrice = function () {
    return ((this.price * weight) / 100);
}
Salad.prototype.calculateCalories = function () {
    return ((this.calories * weight) / 100);
}

// задаем константы
Salad.CAESAR = {
    'price': 100,
    'calories': 20
}

Salad.OLIVIE = {
    'price': 50,
    'calories': 80
}

// за счет этой строчки в прототайпе салата сохраняется ссылка на прототайп дринка и мы можем использовать его методы
Salad.prototype = Object.create(Drink.prototype);

//создаем класс гамбургер  и наследуем от него свойства салата
function Hamburger(size, stuffing) {
    Drink.call(this, size);
    this.calories += stuffing.calories;
    this.price += stuffing.price
}

Hamburger.SIZE_SMALL = {
    'price': 50,
    'calories': 20
}
Hamburger.SIZE_LARGE = {
    'price': 100,
    'calories': 40
}
Hamburger.STUFFING_CHEESE = {
    'price': 10,
    'calories': 20
}
Hamburger.STUFFING_SALAD = {
    'price': 20,
    'calories': 5
}
Hamburger.STUFFING_POTATO = {
    'price': 15,
    'calories': 10
}

// за счет этой строчки в прототайпе гамбургер сохраняется ссылка на прототайп дринка и мы можем использовать его методы
Hamburger.prototype = Object.create(Drink.prototype);

// пример бургера
var myBurger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
console.log(myBurger.calculatePrice())

function Order() {
    // делаем arguments массивом
    var args = [].slice.call(arguments)
    this.items = args;

    // суммируем все суммы со всех элементов, то есть на каждом вызываем calculatePrice() потому что они есть на каждом, и суммируем
    this.getPrice = function () {
        var sum = 0;
        for (var i = 0; i < this.items.length; i++) {
            sum += this.items[i].calculatePrice();
        }
        return sum;
    }

    // суммируем все калории со всех элементов, то есть на каждом вызываем calculateCalories() потому что они есть на каждом, и суммируем
    this.getCalories = function (args, value) {
        var sum = 0;
        for (var i = 0; i < this.items.length; i++) {
            sum += this.items[i].calculateCalories();
        }
        return sum;
    }

    // создаем функцию которая принимет условный элемент el и пушит в rest (он же  this.items)
    this.addSome = function (el) {
        return args.push(el)
    }

    this.removeSome = function (value) {
        var index = this.items.indexOf(value);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        return this.items;
    }


    // заморозили каждый элемент объекта order
    this.pay = function () {
        for (var key in this) {
            Object.freeze(this[key])
        }
    }
}


// создаем заказ
var i1 = {
    'price': 30,
    'calories': 5
}

var i2 = {
    'price': 30,
    'calories': 5
}


var i3 = {
    'price': 30,
    'calories': 5
}
var i4 = {
    'price': 30,
    'calories': 5
}
var i5 = {
    'price': 30,
    'calories': 5
}


// примеры и экземпляры наших классов
var drink = new Drink(i1)
var salad = new Salad(i2, 300)
var burger = new Hamburger(i3, i4)
var burgerOth = new Hamburger(i3, i5)
var order = new Order(drink, salad, burger, burgerOth);
console.log(order.removeSome(burgerOth))
console.log(salad.calculatePrice())

// после вызова функции ниже нельзя удалить/добавить экземпляр
order.pay()
// console.log(order.removeSome(burgerOth))
