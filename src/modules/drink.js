import { Item } from './item.js';

export class Drink extends Item {
    
    constructor(type) {
        super(type);
    }
}

export const DRINK = {
    COLA: {'price' : 50, 'cal' : 40, 'description': 'Cola'},
    COFFEE: {'price' : 80, 'cal' : 20, 'description': 'Coffee with milk'}
};