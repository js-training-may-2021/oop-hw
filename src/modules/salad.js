import { Item } from './item.js';

export class Salad extends Item {

    constructor(type, weight = type.defaultWeight) {
        super(type);
        this._weight = weight;        
    }

    getPrice() {
        return super.getPrice() * this._weight / this._type.defaultWeight;
    }

    getCalories() {
        return super.getCalories() * this._weight / this._type.defaultWeight;
    }
}

export const SALAD = {
    CAESAR: {'price' : 100, 'cal' : 20, 'defaultWeight': 100, 'description': 'Caesar'},
    RUSSIAN_SALAD: {'price' : 50, 'cal' : 80, 'defaultWeight': 100, 'description': 'Russian salad'}
};
