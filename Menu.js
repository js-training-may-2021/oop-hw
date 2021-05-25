const Hamburger = require('./Hamburger').Hamburger,
    Beverage = require('./Beverage').Beverage,
    Salad = require('./Salad').Salad,
    Stuffing = require('./Stuffing').Stuffing;

class Menu {
    //Burger sizes
    /**
     * Создать гамбургер маленького размера
     */
    static createSmallHamburger(stuffing) {
        return new Hamburger('Hamburger "Bite"', 50, 20, stuffing);
    }
    /**
     * Создать гамбургер большого размера
     */
    static createLargeHamburger(stuffing) {
        return new Hamburger('Hamburger "Gigabite"', 100, 40, stuffing);
    }
    //Burger stuffings
    /**
     * Создать сырную начинку
     */
    static createCheeseStuffing(){
        return new Stuffing('cheese', 10, 20);
    }
    /**
     * Создать салатную начинку
     */
    static createSaladStuffing(){
        return new Stuffing('salad', 20, 5);
    }
    /**
     * Создать картофельную начинку
     */
    static createPotatoStuffing(){
        return new Stuffing('potato', 15, 10);
    }
    //Beverages
    /**
     * Создать колу
     */
    static createCola(){
        return new Beverage('Cola', 50, 40);
    }
    /**
     * Создать кофе
     */
    static createCoffee(){
        return new Beverage('Coffee', 80, 20);
    }
    //Salads
    /**
     * Создать салат "Цезарь"
     */
    static createCaesar(weight) {
        return new Salad('Caesar', 100, 20, weight);
    }

    /**
     * Создать салат "Оливье"
     */
    static createOlivier(weight) {
        return new Salad('Olivier', 50, 80, weight);
    }
}