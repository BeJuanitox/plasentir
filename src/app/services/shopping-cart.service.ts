import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  subject$: BehaviorSubject<string> = new BehaviorSubject('');
  shoppingCart: Product[] = [];

  constructor(private readonly localStorageService: LocalStorageService) {}

  initializeShoppingCart(): void {
    const items = this.localStorageService.getLocalStorageItem('shopping_cart');
    if(!items || items.length === 0) {
      return;
    }
    this.shoppingCart = items;
    this.subject$.next('');
  }

  addRemoveToCart(product: Product): void {
    if(this.shoppingCart.filter(item => item.code === product.code).length > 0) {
      this.shoppingCart = this.shoppingCart.filter(productItem => productItem.code !== product.code);
    }else {
      this.shoppingCart.push(product);
    }
    this.localStorageService.setLocalStorageItem('shopping_cart', this.shoppingCart);
    this.subject$.next(product.code);
  }

  removeFromCart(code: string) {
    this.shoppingCart = this.shoppingCart.filter(product => product.code !== code);
    this.localStorageService.setLocalStorageItem('shopping_cart', this.shoppingCart);
    this.subject$.next(code);
  }

  isOnCart(code: string): boolean {
    return this.shoppingCart.filter(product => product.code === code).length > 0;
  }

  clearShoppingCart(): void {
    this.localStorageService.clearLocalStorage();
    this.shoppingCart = [];
  }

}
