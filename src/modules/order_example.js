import { Drink, DRINK } from './drink.js';
import { Hamburger, HAMBURGER } from './hamburger.js';
import { Salad, SALAD } from './salad.js';
import { Order } from './order.js';

export function orderExample() {

    let hamburger1 = new Hamburger(HAMBURGER.SIZE_SMALL, HAMBURGER.STUFFING_CHEESE);
    let hamburger2 = new Hamburger(HAMBURGER.SIZE_LARGE, HAMBURGER.STUFFING_CHEESE);
    const SALAD_WEIGHT = 400;
    let salad1 = new Salad(SALAD.CAESAR);
    let salad2 = new Salad(SALAD.RUSSIAN_SALAD, SALAD_WEIGHT);
    let cola = new Drink(DRINK.COLA);
    let coffee = new Drink(DRINK.COFFEE);
    let order = new Order();
    order.addItem(hamburger1);
    hamburger2.setStuffing(HAMBURGER.STUFFING_SALAD);
    order.addItem(hamburger2);
    order.addItem(salad1);
    order.addItem(salad2);
    order.addItem(cola);
    order.addItem(coffee);
    order.deleteItemByPosition(1);
    order.printReceipt();

    order.doPay();    

    order.deleteItemByClass(Hamburger);    
    order.deleteItemByDescription('Coffee with milk');
    order.printReceipt();
}
