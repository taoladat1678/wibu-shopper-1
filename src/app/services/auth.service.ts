import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable ({
  providedIn: 'root'
})

export class AuthService {
  url = 'http://localhost:3000/api';
  loggedIn = false;
  constructor (private HttpClient: HttpClient) {

  }
  register(body: any): any{
    return this.HttpClient.post<any>(`${this.url}/users/register`, body)

  }

  login(body: any): any{
    return this.HttpClient.post<any>(`${this.url}/users/login`, body)

  }

  // isAuthenticated (){
  //   const promise = new Promise<boolean>((resolve, reject) => {
  //     let jsonData = localStorage.getItem('login');
  //     if (jsonData){
  //       this.loggedIn = true;
  //       resolve(this.loggedIn);
  //     } else {
  //       resolve(this.loggedIn);
  //     }
  //   });
  //   return promise;


  // }

  // isAdmin (){
  //   const promise = new Promise<boolean>((resolve, reject) => {
  //     let jsonData = localStorage.getItem('login');
  //     if (jsonData){
  //       if (JSON.parse(jsonData).isAdmin == 1){
  //         this.loggedIn = true;
  //       resolve(this.loggedIn);
  //       }

  //     } else {
  //       resolve(this.loggedIn);
  //     }
  //   });
  //   return promise;


  // }


  getToken(): string {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData).accessToken;
    }
    return '';
  }

  getRefreshToken(): string {
    let jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData).refreshToken;
    }
    return '';
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.HttpClient.post<any>(`${this.url}/users/token/refresh`, { refreshToken });
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      // Simulating an async authentication check (e.g., API call)
      const token = localStorage.getItem('token');
      resolve(!!token);
    });
  }

  isAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const jsonData = localStorage.getItem('login');
      if (jsonData) {
        try {
          const userData = JSON.parse(jsonData);
          if (userData.isAdmin === 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          reject('Error parsing JSON data');
        }
      } else {
        resolve(false);
      }
    });
  }


  checkAdmin(){
    let jsonData = localStorage.getItem('login');
    if (jsonData){
      if (JSON.parse(jsonData).isAdmin == 1){
        return JSON.parse(jsonData);
      }
    }

    return false;
  }





}

