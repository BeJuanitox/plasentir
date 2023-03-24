import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { mockProductsList } from '../../mock/products.mock';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsList: Product[] = mockProductsList;
  shoppingCartList: Product[] = [];
  unsubscribe$: Subject<null> = new Subject();

  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.subject$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.shoppingCartList = this.shoppingCartService.shoppingCart;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  isOnCart(code: string): boolean {
    const productOnList = this.shoppingCartList.find(product => product.code === code);
    return productOnList ? true : false;
  }

  addRemoveToCart(product: Product): void {
    this.shoppingCartService.addRemoveToCart(product);
    this.shoppingCartList = this.shoppingCartService.shoppingCart;
  }
}
