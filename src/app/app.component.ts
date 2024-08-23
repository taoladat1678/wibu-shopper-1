import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asm';
  isAdminRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra xem URL hiện tại có chứa 'admin' không
        this.isAdminRoute = this.router.url.includes('/category-list') ||
        this.router.url.includes('/category-add') ||
        this.router.url.includes('/category-edit') ||
        this.router.url.includes('/product-list') ||
        this.router.url.includes('/product-add') ||
        this.router.url.includes('/product-edit') ||
        this.router.url.includes('/warning')
      }
    });
  }
}
