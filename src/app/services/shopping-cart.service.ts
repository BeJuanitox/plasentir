import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  subject$: BehaviorSubject<string> = new BehaviorSubject('');
  shoppingCart: Product[] = [];

  addRemoveToCart(product: Product): void {
    if(this.shoppingCart.includes(product)) {
      this.shoppingCart = this.shoppingCart.filter(productItem => productItem.code !== product.code);
    }else {
      this.shoppingCart.push(product);
    }
    
    this.subject$.next(product.code);
  }

  removeFromCart(code: string) {
    this.shoppingCart = this.shoppingCart.filter(product => product.code !== code);
    this.subject$.next(code);
  }
}
