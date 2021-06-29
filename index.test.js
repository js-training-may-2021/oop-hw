const {
  Burger,
  Cheese,
  Ceasar,
  Coffee,
  Cola,
  Order,
  RussianSalad,
} = require('./index');

describe('Home work', () => {
  test('should create a small burger correctly', () => {
    const burger1 = new Burger();
    expect(burger1.calculatePrice()).toBe(60);
    expect(burger1.calculateCalories()).toBe(40);
  });

  test('should create a big burger correctly', () => {
    const burger2 = new Burger(Burger.SIZE_LARGE, [Burger.STUFFING_POTATO, Burger.STUFFING_SALAD]);
    expect(burger2.calculatePrice()).toBe(135);
    expect(burger2.calculateCalories()).toBe(55);
  });

  test('should create ceasar correctly', () => {
    const ceasar1 = new Ceasar(150);
    expect(ceasar1.calculatePrice()).toBe(150);
    expect(ceasar1.calculateCalories()).toBe(30);
  });

  test('should create russian salad correctly', () => {
    const russianSalad1 = new RussianSalad(150);
    expect(russianSalad1.calculatePrice()).toBe(75);
    expect(russianSalad1.calculateCalories()).toBe(120);
  });

  test('should create coffee correctly', () => {
    const coffee1 = new Coffee();
    expect(coffee1.calculatePrice()).toBe(80);
    expect(coffee1.calculateCalories()).toBe(20);
  });

  test('should create cola correctly', () => {
    const cola1 = new Cola();
    expect(cola1.calculatePrice()).toBe(50);
    expect(cola1.calculateCalories()).toBe(40);
  });

  test('should create order with 2 burgers and cola correctly', () => {
    const burger1 = new Burger();
    const burger2 = new Burger(Burger.SIZE_LARGE, [Burger.STUFFING_POTATO, Burger.STUFFING_SALAD]);
    const cola1 = new Cola();
    const order1 = new Order();
    order1.addProduct(burger1);
    order1.addProduct(burger2);
    order1.addProduct(cola1);
    expect(order1.calculatePrice()).toBe(245);
    expect(order1.calculateCalories()).toBe(135);
  });

  test('should remove burger from order correctly', () => {
    const burger2 = new Burger(Burger.SIZE_LARGE, [Burger.STUFFING_POTATO, Burger.STUFFING_SALAD]);
    const cola1 = new Cola();
    const order1 = new Order();
    order1.addProduct(burger2);
    order1.addProduct(cola1);
    order1.removeProduct(burger2);
    expect(order1.calculatePrice()).toBe(50);
    expect(order1.calculateCalories()).toBe(40);
  });

  test('should create order with burger, cola and ceasar correctly', () => {
    const burger1 = new Burger();
    const cola1 = new Cola();
    const ceasar1 = new Ceasar(150);
    const order1 = new Order();
    order1.addProduct(burger1);
    order1.addProduct(ceasar1);
    order1.addProduct(cola1);
    expect(order1.calculatePrice()).toBe(260);
    expect(order1.calculateCalories()).toBe(110);
  });

  test('should create order with burger, cola, russian salad and coffee correctly', () => {
    const burger1 = new Burger();
    const cola1 = new Cola();
    const russianSalad1 = new RussianSalad(150);
    const coffee1 = new Coffee();
    const order1 = new Order();
    order1.addProduct(burger1);
    order1.addProduct(russianSalad1);
    order1.addProduct(coffee1);
    order1.addProduct(cola1);
    expect(order1.calculatePrice()).toBe(265);
    expect(order1.calculateCalories()).toBe(220);
  });

  test('should throw an error when you try to add product after payment', () => {
    const burger1 = new Burger();
    const cola1 = new Cola();
    const order1 = new Order();
    order1.addProduct(burger1);
    order1.buy();
    expect(() => order1.addProduct(cola1)).toThrow(Error);
  });
});
