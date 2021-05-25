export class Order {
    
    constructor() {
        this._list = [];
        this._isPaid = false;
    }

    addItem(item) {
        if (!this._isPaid) {
            this._list.push(item);
        } else {
            console.log('Could not add item because the order was already paid');
        }       
    }

    deleteItem(itemToDelete) {
        if (!this._isPaid) {
            this._list = this._list.filter(i => i !== itemToDelete);            
        } else {
            console.log('Could not delete item because the order was already paid');
        }       
    }

    deleteItemByPosition(positionToDelete) {
        if (!this._isPaid) {
            if (positionToDelete <= this._list.length && positionToDelete > 0) {
                this._list.splice(positionToDelete - 1, 1);
            } else {
                console.log(`Could not find item by position = ${positionToDelete}`);
            }  
        } else {
            console.log('Could not delete item because the order was already paid');
        }             
    }

    deleteItemByClass(className) {
        if (!this._isPaid) {
            this._list = this._list.filter(i => !(i instanceof className));
        } else {
            console.log('Could not delete item because the order was already paid');
        }    
    }

    deleteItemByDescription(desc) {
        if (!this._isPaid) {
            this._list = this._list.filter(i => i.getDescription() !== desc);
        } else {
            console.log('Could not delete item because the order was already paid');
        }    
    }

    doPay() {
        this._isPaid = true;
        Object.freeze(this);
    }

    getTotalPrice() {
        let total = 0;
        this._list.forEach((e) => {
            total += e.getPrice();
        });
        return total;
    }

    getTotalCalories() {
        let total = 0;
        this._list.forEach((e) => {
            total += e.getCalories();
        });
        return total;
    }

    printReceipt() { 
        console.log('* * * * *');       
        this._list.forEach((e, position) => {
            console.log(`${position + 1}) ${e.getDescription()}: Price ${e.getPrice()}$ Calories ${e.getCalories()}`);            
        });        
        console.log(`Total price: ${this.getTotalPrice()}$`);
        console.log(`Total calories: ${this.getTotalCalories()}`);       
        console.log(`Paid: ${this._isPaid ? 'Yes' : 'No'}`);
        console.log('* * * * *');
    }
}