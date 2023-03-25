import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  getProduct(): Observable<{[key: string]: any}> {
    return this.http.get('https://plasentir-backend-default-rtdb.firebaseio.com/products.json');
  }

}
