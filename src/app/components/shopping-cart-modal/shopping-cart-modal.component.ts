import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../interfaces/product.interface';
import { baseBusinessUrl, baseWhatsAppMessage } from './shopping-cart-modal.constants';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-shopping-cart-modal',
  templateUrl: './shopping-cart-modal.component.html',
  styleUrls: ['./shopping-cart-modal.component.scss']
})
export class ShoppingCartModalComponent implements OnInit, OnDestroy {

  shoppingCartItems: Product[] = [];
  unsubscribe$: Subject<null> = new Subject();

  whatsAppMessage: string = baseWhatsAppMessage;

  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.subject$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.shoppingCartItems = this.shoppingCartService.shoppingCart;
    });
    this.getItemImages();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  get total(): number {
    return this.shoppingCartItems.length > 0 
      ? this.shoppingCartItems.map(item => Number(item.price)).reduce((a,b) => a + b)
      : 0;
  }

  get itemsInCart(): boolean {
    return this.shoppingCartItems.length > 0;
  }

  removeItem(item: Product): void {
    this.shoppingCartService.addRemoveToCart(item);
  }

  goToWhatsApp(): void {
    this.whatsAppMessage = `
    ${this.whatsAppMessage}
    ${this.shoppingCartService.shoppingCart.map((product, i) => `${i+1}] ${this.getMessageByProduct(product)}`).join('')}
    `;
    window.open(`${baseBusinessUrl}${encodeURIComponent(this.whatsAppMessage)}`, "_blank");
    
    this.shoppingCartService.clearShoppingCart();
  }

  async getItemImages() {
    this.shoppingCartItems = await Promise.all(this.shoppingCartItems.map(async item => {
      return {
        ...item,
        image: await this.firebaseService.getStoredImage(item.image)
      }
    }));
  }
    
  private getMessageByProduct(product: Product): string {
    return `code: ${product.code}
        name: ${product.name}
        ${`http://localhost:4200/product/${product.code}`}
    `;
  }
}
