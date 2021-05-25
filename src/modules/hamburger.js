import { Item } from './item.js';

export class Hamburger extends Item {

    constructor(type, stuffing) {
        super(type);
        this._stuffing = stuffing;        
    }
    
    getPrice() {
        return super.getPrice() + this._stuffing.price;
    }

    getCalories() {
        return super.getCalories() + this._stuffing.cal;
    }

    getDescription() {
        return super.getDescription() + this._stuffing.description;
    }

    setStuffing(stuffing) {
        this._stuffing = stuffing;
    }
}

export const HAMBURGER = {
    SIZE_SMALL: {'price' : 50, 'cal' : 20, 'description' : 'Small hamburger'},
    SIZE_LARGE: {'price' : 100, 'cal' : 40, 'description' : 'Large hamburger'},
    STUFFING_CHEESE: {'price' : 10, 'cal' : 20, 'description' : ' with cheese'},
    STUFFING_SALAD: {'price' : 20, 'cal' : 5, 'description' : ' with salad'},
    STUFFING_POTATO: {'price' : 15, 'cal' : 10, 'description' : ' with potato'}
};
    
