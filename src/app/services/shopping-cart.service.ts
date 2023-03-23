import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  subject$: Subject<string> = new Subject();
  shoppingCart: Product[] = [];

  addToCart(product: Product): void {
    if(this.shoppingCart.includes(product)) {
      return;
    }
    
    this.shoppingCart.push(product);
    this.subject$.next(product.code);
  }

  removeFromCart(code: string) {
    this.shoppingCart = this.shoppingCart.filter(product => product.code !== code);
    this.subject$.next(code);
  }
}
