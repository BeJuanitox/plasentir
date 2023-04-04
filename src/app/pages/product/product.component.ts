import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { FirebaseService } from '../../services/firebase.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product?: Product;
  productImage: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly firebaseService: FirebaseService,
    private readonly shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    const productCode = this.route.snapshot.params['id'];
    this.productService.getProduct(productCode).subscribe(product => {
      this.product = product;
      this.getFirebaseUrlImage(product.image);
    });
  }

  getFirebaseUrlImage(image: string) {
    this.firebaseService.getStoredImage(image)
    .then(url => {
      this.productImage = url;
    });
  }

  get isOnCart(): boolean {
    return this.shoppingCartService.isOnCart(this.product?.code || '');
  }

  addRemoveToCart(): void {
    this.shoppingCartService.addRemoveToCart(this.product!);
  }
}
