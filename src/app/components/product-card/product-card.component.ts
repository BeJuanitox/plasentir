import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product: Product = {
    code: '2020',
    name: 'Test',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias atque inventore',
    price: 200.3,
    image: 'https://cdn-icons-png.flaticon.com/512/4416/4416740.png'
  };
  @Input() addedToCart: boolean = false;
  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter();

  addToCart(): void {
    this.onAddToCart.emit(this.product);
  }
}
