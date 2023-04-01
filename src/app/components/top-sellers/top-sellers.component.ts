import { Component, Input, OnInit } from '@angular/core';
import { TopSellers } from 'src/app/interfaces/top-sellers';
import { mockTopSellers } from 'src/app/mock/sellers';

@Component({
  selector: 'app-top-sellers',
  templateUrl: './top-sellers.component.html',
  styleUrls: ['./top-sellers.component.scss']
})
export class TopSellersComponent implements OnInit {

  @Input() productSellers: TopSellers[] = mockTopSellers;
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() autoSlide: boolean = false;
  @Input() slideInterval: number = 3000;

  selectedIndex: number = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideProducts()
    }
  }

  autoSlideProducts(): void {
    setInterval( () => {
      this.onNextClick();
    }, this.slideInterval);
  }

  selectedProducts(index: number): void {
    this.selectedIndex = index; 
  }

  onPreviousClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.productSellers.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.productSellers.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

}
