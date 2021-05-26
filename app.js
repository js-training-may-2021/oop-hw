const sizeParam = {
    big: { 
        price: 100,
        calories: 40,
    },
    small: { 
        price: 50,
        calories: 20,
    },
}

const stuffingParam = {
    cheese: { 
        price: 10,
        calories: 20,
    },
    salad: { 
        price: 20,
        calories: 5,
    },
    potato: { 
        price: 15,
        calories: 10,
    },
}

const salads = {
    caesar: {
        price: 100,
        calories: 20,
    },
    olivie: {
        price: 50,
        calories: 80,
    }
}

const drinks = {
    cola: {
        price: 50,
        calories: 40,
    },
    coffee: {
        price: 80,
        calories: 20,
    }
}

const paramLength = 2;
const saladWeight = 100;

class Product {
    constructor(...params) {
        this.key = params.join('-');
    }
}

class Hamburger extends Product {
    constructor(size, stuffing) {
        super('ham', size, stuffing);
        this.size = size;
        this.stuffing = stuffing;  
    }
    getSize() {
        return this.size;
    }
    getStuffing() {
        return this.stuffing;
    }
    calculatePrice() {    
        return sizeParam[this.size].price + stuffingParam[this.stuffing].price;
    }
    calculateCalories() {   
        return sizeParam[this.size].calories + stuffingParam[this.stuffing].calories;
    }
}

class Salad extends Product {
    constructor(name, weight) {
        super('salad', name, weight);
        this.name = name;
        this.weight = weight;    
    }
    calculatePrice() {    
        return salads[this.name].price * this.weight / saladWeight;
    }
    calculateCalories() {   
        return salads[this.name].calories * this.weight / saladWeight;
    }
}

class Drink extends Product {
    constructor(name) {
        super('drink', name);
        this.name = name;   
    }
    calculatePrice() {    
        return drinks[this.name].price;
    }
    calculateCalories() {   
        return drinks[this.name].calories;
    }
}

class Order {
    constructor () {
        this.goods = [];
        this.isPaid = false;
    }
    getItems() {
        return this.goods;
    }
    addItem(type, ...param) {
        if(this.isPaid === false) {
            switch(type) {
                case "ham":
                    if(param.length === paramLength) {
                        if(Object.keys(sizeParam).includes(param[0]) && Object.keys(stuffingParam).includes(param[1])) {
                            this.goods.push(new Hamburger(...param));
                        } else {
                            console.error("There is no such hamburger in the menu");
                        }
                    } else {
                        console.warn("Hamburger's not added, specify size and stuffing");
                    }
                    break;
                case "drink":
                    if(Object.keys(drinks).includes(param[0])) {
                        this.goods.push(new Drink(param[0]));
                    } else {
                        console.error("There is no such drink in the menu");
                    }
                    break;
                case "salad":
                    if(param.length === paramLength) {
                        if(Object.keys(salads).includes(param[0]) && typeof param[1] === 'number') {
                            this.goods.push(new Salad(...param));
                        } else {
                            console.error("There is no such salad in the menu or weight is not a number");
                        }
                    } else {
                        console.warn("Salad's not added, specify name and weight");
                    }    
                    break;
            }  
        } else {
            console.log("The order is already paid");
        }    
    }
    removeItem(type, ...param) {
        param.unshift(type);
        let key = param.join('-');
        if(this.isPaid === false) {
            let index = this.goods.findIndex((item) => key === item.key);
            if(index !== -1){
                this.goods.splice(index, 1);
            }
        } else {
            console.log("The order is already paid");
        } 
    }
    totalPrice() {
        return this.goods.reduce((acc, curr) => {
            return acc + curr.calculatePrice();
        }, 0)
    }
    totalCalories() {
        return this.goods.reduce((acc, curr) => {
            return acc + curr.calculateCalories();
        }, 0)
    }
    pay() {
        this.isPaid = true;
    }
}

const order1 = new Order();
order1.addItem('ham', 'small', 'salad');
order1. addItem('drink',"coffee");
order1.addItem('salad', 'olivie', 150);
order1.addItem('salad', 'oliv', 150);
order1. addItem('ham', 'big', 'cheese');
order1. removeItem('ham', 'big', 'cheese');
order1.pay();
