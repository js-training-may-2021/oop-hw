class Item {
  constructor(type) {
    this.name = type.name;
    this.price = type.price;
    this.calories = type.calories;
  }
  getItemName() {
    return this.name;
  }
  calculatePrice() {
    return this.price;
  }
  calculateCalories() {
    return this.calories;
  }
}

export default Item;
