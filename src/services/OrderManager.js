export class OrderManager {
  constructor() {
    if (OrderManager.instance) {
      return OrderManager.instance;
    }
    this.items = [];
    OrderManager.instance = this;
  }

  static getInstance() {
    if (!OrderManager.instance) {
      OrderManager.instance = new OrderManager();
    }
    return OrderManager.instance;
  }

  addItem(product) {
    this.items.push(product);
  }

  calculateTotal() {
    return this.items.reduce((acc, item) => acc + item.subtotal, 0);
  }

  clear() {
    this.items = [];
  }
}