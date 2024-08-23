import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.url}/products`);
  }

  get(id: string): Observable<any> {
    return this.httpClient.get(`${this.url}/products/${id}`);
  }

  save(product: Product): Observable<any> {
    return this.httpClient.post(`${this.url}/products`, product);
  }

  update(id: string, product: Product): Observable<any> {
    return this.httpClient.put(`${this.url}/products/${id}`, product);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/products/${id}`);
  }

  getByPriceRange(minPrice: number, maxPrice: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('minPrice', minPrice.toString());
    params = params.append('maxPrice', maxPrice.toString());

    return this.httpClient.get(`${this.url}/products/filterByPrice`, { params });
  }

  getByCategory(categoryId: string): Observable<any> {
    const url = `${this.url}/products/categoryId/${categoryId}`;
    return this.httpClient.get(url);
  }
}
