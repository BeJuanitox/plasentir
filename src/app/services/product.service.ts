import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  getProduct(): Observable<{[key: string]: Product}> {
    return this.http.get<{[key: string]: Product}>('https://plasentir-backend-default-rtdb.firebaseio.com/products.json');
  }

}
