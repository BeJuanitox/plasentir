import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private readonly router: Router
  ) {}

  @Input() product: Product = {
    code: '2020',
    name: 'Test',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias atque inventore',
    price: 200.3,
    image: 'https://cdn-icons-png.flaticon.com/512/4416/4416740.png'
  };
  @Input() addedToCart: boolean = false;
  @Output() onAddRemoveToCart: EventEmitter<Product> = new EventEmitter();

  productImage: string = '';

  ngOnInit(): void {
    this.getFirebaseUrlImage(this.product.image);
  }

  addRemoveToCart(): void {
    this.onAddRemoveToCart.emit(this.product);
  }

  getFirebaseUrlImage(image: string) {
    this.firebaseService.getStoredImage(image)
    .then(url => {
      this.productImage = url;
    });
  }

  goToDetail(): void {
    this.router.navigateByUrl(`/product/${this.product.code}`);
  }
}
