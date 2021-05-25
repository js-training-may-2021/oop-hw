export class Item {

    constructor(type) { 
        this._type = type;
    }
    
    getPrice() {
        return this._type.price;
    }
    
    getCalories() {
        return this._type.cal;
    }

    getDescription() {
        return this._type.description;
    }
}