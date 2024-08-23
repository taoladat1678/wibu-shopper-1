import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Category } from '../models/category';
@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor(private httpClient: HttpClient) { }

}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    url = "http://localhost:3000/api";

    constructor(private httpClient: HttpClient, private auth: AuthService) { }

    // getAll() {
    //   const headers = {'Authorization' :'Bearer' + this.auth.getToken() };
    //     return this.httpClient.get(`${this.url}/categories`, {headers});
    // }

    getAll(): Observable<any> {
      const headers = { 'Authorization': 'Bearer ' + this.auth.getToken() };
      return this.httpClient.get(`${this.url}/categories`, { headers }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            console.log('Token expired');
            return this.auth.refreshToken().pipe(
              switchMap((res: any) => {
                localStorage.setItem('login', JSON.stringify(res));
                const newHeaders = { 'Authorization': 'Bearer ' + res.accessToken };
                return this.httpClient.get(`${this.url}/categories`, { headers: newHeaders });
              })
            );
          }
          return throwError('Something went wrong; please try again later.');
        })
      );
    }



    get(id: string) {

        return this.httpClient.get(`${this.url}/categories/${id}`);
    }

    save(category: Category): Observable<any> {
        return this.httpClient.post(`${this.url}/categories`, category);
    }

    update(id: string, category: Category): Observable<any> {
        return this.httpClient.put(`${this.url}/categories/${id}`, category);
    }

    delete(id: string): Observable<any> {
      return this.httpClient.delete(`${this.url}/categories/${id}`);
    }

}

