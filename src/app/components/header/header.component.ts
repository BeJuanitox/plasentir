import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  shoppingCartCounter: number = 0;

  constructor(private readonly shoppingCartService: ShoppingCartService) { }
  
  ngOnInit(): void {
    this.shoppingCartService.subject$.subscribe(() => {
      this.shoppingCartCounter = this.shoppingCartService.shoppingCart.length;
    });   
  }
}
