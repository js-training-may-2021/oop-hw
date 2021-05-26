class Position {
    constructor(type = {name: 'menu-position', calories: 0, price: 0}) {
        this.type = type;
    }

    getName() {
        return this.type.name;
    }

    calculateCalories() {
        return this.type.calories;
    }

    calculatePrice() {
        return this.type.price;
    }
}

class Hamburger extends Position {
    constructor(type, stuffing, category = 'hamburgers') {
        super(type);
        this.stuffing = stuffing;
        this.category = category;
    }

    getSize() {
        return super.getName().substr(0, super.getName().indexOf(' '));
    }

    getStuffing() {
        return this.stuffing.name;
    }

    getDishName() {
        return `${this.getName()}` + ' with ' + `${this.getStuffing()}`;
    }

    calculateCalories() {
        return super.calculateCalories() + this.stuffing.calories;
    }

    calculatePrice() {
        return super.calculatePrice() + this.stuffing.price;
    }

    getCategory() {
        return this.category;
    }
}


Hamburger.SIZE_SMALL = {name: 'Small hamburger', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'Big hamburger', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'Cheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: 'Salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'Potato', price: 15, calories: 10};


class Salad extends Position {
    constructor(type, weight, category = 'salads') {
        super(type);
        this.weight = weight;
        this.category = category;
    }

    getDishName() {
        return `${this.getName()}` + ' , ' + `${this.weight}` + 'gr';
    }

    getWeightCoef() {
        const ratio = 100;
        return this.weight /= ratio;
    }

    calculateCalories() {
        return super.calculateCalories() * this.getWeightCoef();
    }

    calculatePrice() {
        return super.calculatePrice() * this.getWeightCoef();
    }

    getCategory() {
        return this.category;
    }
}

Salad.TYPE_CAESAR = {name: 'Caesar salad',  price: 100, calories: 20};
Salad.TYPE_OLIVIER = {name: 'Olivier salad', price: 50, calories: 80};


class Drink extends Position {
    constructor(type, category = 'drinks') {
        super(type);
        this.category = category;
    }

    getCategory() {
        return this.category;
    }
}

Drink.TYPE_COKE = {name: 'Coke', price: 50, calories: 40};
Drink.TYPE_COFFEE = {name: 'Coffee', price: 80, calories: 20};

export default class Order {
    constructor(...positions) {
        this.orderList = positions;
        this.isPaid = false;
    }
    
    calculatePrice() {
        return this.orderList.reduce((acc, item) => (acc += item.calculatePrice()), 0);
    }
    
    calculateCalories() {
        return this.orderList.reduce((acc, item) => (acc += item.calculateCalories()), 0);
    }

    payForOrder() {
        if(this.isPaid) {
            console.log('The order has already been paid!');
        }
        this.isPaid = true;
    }
    addDish(item) {
        if(this.isPaid) {
            console.log('The order is paid and can not be changed!')
        } 
       this.orderList.push(item);
       return this;
    }

    removeDish(arg) {
        if(this.isPaid) {
            console.log('The order is paid and can not be changed!'); 
        } else if (!arg) {
            console.log('Choose a dish to be removed!');
        } else if (this.orderList.length < 1) {
            console.log('Order list is empty!');
            return this; 
        }
        if (typeof(arg) === 'number') {
            let trueIndex = arg - 1; 
            this.orderList[trueIndex] ? this.orderList.splice(trueIndex, 1) : console.log('There is no dish with this number in the order')
            return this.orderList;
        }
        if (typeof(arg) === 'string') {
            for (let i = 0; i < this.orderList.length; i++) {
              this.orderList[i].getCategory() === arg ? this.orderList.splice(i, 1) : -1;
            }
        }
    }

    getOrderList() {
        return this.orderList
    };

}


const burger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);
const salad = new Salad (Salad.TYPE_CAESAR, 230);
const drink = new Drink (Drink.TYPE_COFFEE);
const order = new Order (salad, drink, salad, burger);

console.log(order);

console.log(order.calculatePrice());


