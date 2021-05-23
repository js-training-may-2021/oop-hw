const LARGE_HAMBURGER_PR = 100;
const SMALL_HAMBURGER_PR = 50;
const LARGE_HAMBURGER_CAL = 40;
const SMALL_HAMBURGER_CAL = 20;
const CHEESE_STUF_PR = 10;
const SALAD_STUF_PR = 20;
const POTATO_STUF_PR = 15;
const CHEESE_STUF_CAL = 20;
const SALAD_STUF_CAL = 5;
const POTATO_STUF_CAL = 10;
const CAESAR_PR = 100;
const OLIVIER_PR = 50;
const CAESAR_CAL = 20;
const OLIVIER_CAL = 80;
const COFFEE_PR = 80;
const COLA_PR = 50;
const COFFEE_CAL = 40;
const COLA_CAL = 20;

const form = document.querySelector('form');
const resetButton = document.querySelector('.reset-btn');
const orderItems = document.querySelector('.order-items');
const total = document.querySelector('.total');

const coffee = document.querySelector('#coffee');
const cola = document.querySelector('#cola');
const olivier = document.querySelector('#olivier');
const caesar = document.querySelector('#caesar');
const hamburgerLarge = document.querySelector('#hamburger-large');
const hamburgerSmall = document.querySelector('#hamburger-small');
const stuffingLarge = document.querySelector('large-hamburger-stuffing');
const stuffingSmall = document.querySelector('small-hamburger-stuffing');

const addCoffee = document.querySelector('#add-coffee');
const addCola = document.querySelector('#add-cola');
const addOlivier = document.querySelector('#add-olivier');
const addCaesar = document.querySelector('#add-caesar');
const addHamburgerLarge = document.querySelector('#add-hamburger-large');
const addHamburgerSmall = document.querySelector('#add-hamburger-small');

const checkStuffing = (selectName) => {
  const select = document.querySelector(selectName);
  return select.value;
};

const createItem = (field, Type, title, price, calories) => {
  if (!!field.checked) {
    let item = new Type(title, price, calories);
    order.addItem(item);
    order.renderSummary();
    console.log(`К заказу добавлен 1 ${title}`);
  }
};

const createStuffing = (title) => {
  let stuffingType = null;
  
  if (title === 'Бол. гамбургер') {
    stuffingType = checkStuffing('#large-hamburger-stuffing');
  } else if (title === 'Мал. гамбургер') {
    stuffingType = checkStuffing('#small-hamburger-stuffing');
  }

  let stuffing = null;
    
  if (stuffingType === 'Сыр') {
    stuffing = new Stuffing('Сыр', CHEESE_STUF_PR, CHEESE_STUF_CAL);
  } else if (stuffingType === 'Картошка') {
    stuffing = new Stuffing('Картошка', POTATO_STUF_PR, POTATO_STUF_CAL);
  } else if (stuffingType === 'Салат') {
    stuffing = new Stuffing('Салат', SALAD_STUF_PR, SALAD_STUF_CAL);
  } else {
    return;
  }
    
  return stuffing;
};

const createComplex = (field, title, price, calories) => {
  if (!!field.checked) {
    const stuffing = createStuffing(title);
    if (stuffing !== null) {
      let hamburger = new Hamburger(title, price, calories);
      order.addItem(hamburger);
      order.addItem(stuffing);
      order.renderSummary();
      console.log(`К заказу добавлен 1 ${title} c начинкой "${stuffing._title}"`);
    }
  }
};

class Food {
  constructor(title, price, calories) {
    this._title = title;
    this._price = price;
    this._calories = calories;
  }

  calculatePrice() {
    return this._price;
  }

  calculateCalories() {
    return this._calories;
  }
}

class Salad extends Food {
}

class Drink extends Food {
}

class Stuffing extends Food {
}

class Hamburger extends Food {
}

class Order {
  constructor(items = []) {
    this._items = items;
  }

  addItem(item) {
    this._items.push(item);
  }

  removeItem(title) {
    const result = this._items.filter((elem) => elem._title !== title);
    this._items = result;
    this.renderSummary();
  }

  getFullCalories() {
    let copy = [...this._items];
    let sum = 0;
    for (let elem of copy) {
      sum += elem._calories;
    }
    return sum;
  }

  getFullPrice() {
    let copy = [...this._items];
    let sum = 0;
    for (let elem of copy) {
      sum += elem._price;
    }
    return sum;
  }

  getOrderInfo() {
    const makeOrderRow = (item, count = 1) => {
      let title = item._title;
      if (title === 'Салат' || title === 'Сыр' || title === 'Картошка') {
        title = '+ начинка: ' + title;
      }
      return `${title} (${count} шт.), ${item._calories} кал, ${item._price} тугриков<br>`;
    };

    if (this._items.length <= 0) {
      return '';
    } else {
      let copy = [...this._items];
      return copy.map((elem) => makeOrderRow(elem)).join('');
    }
  }

  getOrderTotal() {
    let result = 'Ничего не добавлено';
    if (this._items.length > 0) {
      const totalSum = this.getFullPrice();
      const totalCalories = this.getFullCalories();
      let copy = [...this._items];
      const listCleaned = copy.filter((el) => el._title !== 'Салат' && el._title !== 'Картошка' && el._title !== 'Сыр');
      const count = listCleaned.length;
      result = `ИТОГО: ${count} позиций, ${totalCalories} кал, ${totalSum} тугриков`
    }
    return result;
  }

  clear() {
    this._items = [];
  }

  renderSummary() {
    const itemsList = this.getOrderInfo();
    const totalSum = this.getOrderTotal();
    orderItems.innerHTML = itemsList;
    total.innerHTML = totalSum;
  }
}

const order = new Order();

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  order.clear();
  order.renderSummary();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const fieldsets = document.querySelectorAll('fieldset');
  const links = document.querySelectorAll('.add, .remove');
  fieldsets.forEach((elem) => elem.setAttribute('disabled', 'disabled'));
  links.forEach((elem) => {
    elem.style.visibility = 'hidden';
    elem.style.display = 'none';
  });
});

addCoffee.addEventListener('click', () => createItem(coffee, Drink, 'Кофе', COFFEE_PR, COFFEE_CAL));
addCola.addEventListener('click', () => createItem(cola, Drink, 'Кола', COLA_PR, COLA_CAL));
addOlivier.addEventListener('click', () => createItem(olivier, Salad, 'Салат Оливье', OLIVIER_PR, OLIVIER_CAL));
addCaesar.addEventListener('click', () => createItem(caesar, Salad, 'Салат Цезарь', CAESAR_PR, CAESAR_CAL));

addHamburgerLarge.addEventListener('click', () => {
  const stuffingType = checkStuffing('#large-hamburger-stuffing');
  if (stuffingType === '0') {
    return;
  } else {
    createComplex(hamburgerLarge, 'Бол. гамбургер', LARGE_HAMBURGER_PR, LARGE_HAMBURGER_CAL);
  }
});

addHamburgerSmall.addEventListener('click', () => {
  const stuffingType = checkStuffing('#small-hamburger-stuffing');
  if (stuffingType === '0') {
    return;
  } else {
    createComplex(hamburgerSmall, 'Мал. гамбургер', SMALL_HAMBURGER_PR, SMALL_HAMBURGER_CAL);
  }
});