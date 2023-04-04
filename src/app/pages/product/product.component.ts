import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product?: Product;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
  }

}
