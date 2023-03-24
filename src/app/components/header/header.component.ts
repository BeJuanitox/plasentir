import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartModalComponent } from '../shopping-cart-modal/shopping-cart-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  shoppingCartCounter: number = 0;
  unsubscribe$: Subject<null> = new Subject();

  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    public readonly dialog: MatDialog
  ) { }
  
  ngOnInit(): void {
    this.shoppingCartService.initializeShoppingCart();
    this.shoppingCartService.subject$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.shoppingCartCounter = this.shoppingCartService.shoppingCart.length;
    });   
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  showShoppingCart(): void {
    this.dialog.open(ShoppingCartModalComponent);
  }
}
