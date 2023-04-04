import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  baseUrl: string = 'https://plasentir-backend-default-rtdb.firebaseio.com/products.json';

  getProducts(): Observable<Product[]> {
    return this.http.get<{[key: string]: Product}>(this.baseUrl)
    .pipe(
      map(product => {
        return Object.values(product);
      })
    );
  }

  getProduct(productCode: string): Observable<Product> {
    let params = new HttpParams();
    params = params.append('orderBy', '"code"');
    params = params.append('startAt', JSON.stringify(productCode)); 
    params = params.append('limitToFirst', 1); 
    return this.http.get<{[key: string]: Product}>(`${this.baseUrl}`, { params: params })
    .pipe(
      map(product => {
        return Object.values(product)[0];
      })
    );
  }
}
