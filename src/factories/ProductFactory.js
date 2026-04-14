import { Product } from '../models/Product.js';

export class ProductFactory {
  static createProduct(type, quantity) {
    const prices = {
      'pastel': 5,
      'caldo': 7,
      'refrigerante': 4,
      'suco': 6
    };

    const price = prices[type] || 0;
    return new Product(type, price, quantity);
  }
}