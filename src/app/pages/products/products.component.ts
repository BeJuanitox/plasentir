import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductService } from '../../services/product.service';
import { mockTopSellers } from 'src/app/mock/sellers';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  shoppingCartList: Product[] = [];
  unsubscribe$: Subject<null> = new Subject();
  products: Product[] = [];
  productsOriginal: Product[] = [];
  productTopSellers = mockTopSellers;

  constructor(private readonly shoppingCartService: ShoppingCartService,
              private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
  this.productService.getProducts().subscribe(resp => {
    this.products = resp;
    this.productsOriginal = resp;
  });
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

  handleSearch(value: string) {
    if ( value.trim() === '') {
      this.products = this.productsOriginal;
    } else {
      this.products = this.productsOriginal.filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
    }
  }

  pageSize: number = 20;
  pageNumber: number = 1;
  pageSizeOptions = [20, 50, 100];
  hidePageSize: boolean = true;

  handlePage(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
  }

}
