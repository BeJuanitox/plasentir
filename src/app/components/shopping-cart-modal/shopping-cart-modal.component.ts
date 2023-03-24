import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.scss']
})
export class ShoppingCartModalComponent implements OnInit, OnDestroy {

  shoppingCartItems: Product[] = [];
  unsubscribe$: Subject<null> = new Subject();

  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.subject$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.shoppingCartItems = this.shoppingCartService.shoppingCart;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  get total(): number {
    return this.shoppingCartItems.map(item => item.price).reduce((a,b) => a + b);
  }

  get itemsInCart(): boolean {
    return this.shoppingCartItems.length > 0;
  }

  removeItem(item: Product): void {
    this.shoppingCartService.addRemoveToCart(item);
  }
}
