import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { mockProductsList } from '../../mock/products.mock';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList: Product[] = mockProductsList;
  shoppingCartList: Product[] = [];

  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  isOnCart(code: string): boolean {
    const productOnList = this.shoppingCartList.find(product => product.code === code);
    return productOnList ? true : false;
  }

  addToCart(product: Product): void {
    this.shoppingCartService.addToCart(product);
    this.shoppingCartList = this.shoppingCartService.shoppingCart;
  }
}
