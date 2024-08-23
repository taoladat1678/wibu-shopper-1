import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryService: CategoryService, private router: Router, private auth:AuthService) { }

  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAll().subscribe(
      data => {
        this.categories = data as Category[];
        console.log(this.categories);
      },
      (error: any) => {
        console.log(error);
        if (error && error.status === 403) {
          this.auth.refreshToken().subscribe(
            (res: any) => {
              console.log(res);
              localStorage.setItem('login', JSON.stringify(res));

              // Gọi lại getAll sau khi làm mới token
              this.categoryService.getAll().subscribe(data => {
                this.categories = data as Category[];
              });
            },
            (refreshError: any) => {
              console.log("Lỗi refresh", refreshError);
              this.router.navigate(['/login']);
            }
          );
        }
      }
    );
  }
  deleteCategory(id: string) {
    const result = confirm('Muốn xóa à ?');
    if (result) {
      this.categoryService.delete(id).subscribe(data => {
        console.log(data);
        this.categories = this.categories.filter(category => category.id !== id);
        this.router.navigate(['/category-list']);
      });
    }
  }
}
