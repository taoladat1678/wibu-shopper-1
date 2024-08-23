import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product'; // Ensure correct import path

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl: string = 'http://localhost:3000/api/products/search';
  private searchResultsSubject: Subject<Product[]> = new Subject<Product[]>(); // Use Product[] for type safety

  constructor(private http: HttpClient) { }

  searchProducts(query: string): void {
    const url = `${this.baseUrl}/${encodeURIComponent(query)}`;
    this.http.get<Product[]>(url).subscribe(
      results => {
        this.setSearchResults(results);
      },
      error => {
        console.error('Error performing search:', error);
        this.setSearchResults([]); // Set empty results on error
      }
    );
  }

  getSearchResults(): Observable<Product[]> {
    return this.searchResultsSubject.asObservable();
  }

  private setSearchResults(results: Product[]): void {
    this.searchResultsSubject.next(results);
  }
}
