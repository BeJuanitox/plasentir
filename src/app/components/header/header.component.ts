import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  shoppingCartCounter: number = 0;
  unsubscribe$: Subject<null> = new Subject();

  constructor(private readonly shoppingCartService: ShoppingCartService) { }
  
  ngOnInit(): void {
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
}
