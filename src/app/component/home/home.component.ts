import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  userEmail: string | null = null;
  selectedCategoryId: string | null = null;
  selectedPriceRange: string | null = null;
  filteredProducts: Product[] = [];
  searchPro: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private searchService: SearchService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.userEmail = localStorage.getItem('email');

    this.searchService.getSearchResults().subscribe(
      results => {
        this.searchPro = results;
        console.log(this.searchPro);
      },
      error => {
        console.error('Lỗi tải kết quả tìm kiếm', error);
      }
    );
  }

  loadProducts() {
    this.productService.getAll().subscribe(
      data => {
        this.products = data as Product[];
        this.filteredProducts = this.products; // Khởi tạo filteredProducts với tất cả sản phẩm
      },
      error => {
        console.error('Lỗi tải sản phẩm', error);
      }
    );
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(
      data => {
        this.categories = data as Category[];
        console.log(this.categories);
      },
      error => {
        console.log(error);
        if (error && error.status == 403) {
          try {
            this.auth.refreshToken().subscribe(res => {
              console.log(res);
              localStorage.setItem('login', JSON.stringify(res));

              this.categoryService.getAll().subscribe(data => {
                this.categories = data as Category[];
              });
            }, refreshError => {
              console.log("Lỗi làm mới", refreshError);
              this.router.navigate(['/login']);
            });
          } catch (refreshError) {
            console.log("Lỗi làm mới", refreshError);
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

  logout(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('email');
    this.userEmail = null;
    this.router.navigate(['/']);
  }

  userIsAdmin(): number {
    const loginData = localStorage.getItem('login');
    if (loginData) {
      const userData = JSON.parse(loginData);
      return userData.isAdmin;
    }
    return 0;
  }

  filterProducts() {
    let filtersApplied = false;

    // Filter by category if selected
    if (this.selectedCategoryId) {
      filtersApplied = true;
      this.productService.getByCategory(this.selectedCategoryId).subscribe(
        data => {
          this.filteredProducts = data as Product[];
          this.applyPriceFilter(); // Apply price filter after category filter
        },
        error => {
          console.error('Lỗi lọc sản phẩm theo danh mục', error);
        }
      );
    }

    // If no category filter, directly apply price filter
    if (!filtersApplied) {
      this.applyPriceFilter();
    }
  }

  applyPriceFilter() {
    if (this.selectedPriceRange) {
      const [minPrice, maxPrice] = this.selectedPriceRange.split('-').map(Number);
      this.productService.getByPriceRange(minPrice, maxPrice).subscribe(
        data => {
          this.filteredProducts = data as Product[];
        },
        error => {
          console.error('Lỗi lọc sản phẩm theo giá', error);
        }
      );
    } else {
      this.filteredProducts = this.products; // No price filter applied
    }
  }

  isFilterApplied(): boolean {
    return !!this.selectedCategoryId || !!this.selectedPriceRange;
  }
}
