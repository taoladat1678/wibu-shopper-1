import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  category!: Category;
  id: string;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) {
    this.id = this.route.snapshot.params['id']; // Sử dụng snapshot để lấy id
    console.log(`id is ${this.id}`);

    this.categoryForm = new FormGroup({
      'id': new FormControl('', Validators.required),
      'categoryName': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.categoryService.get(this.id).subscribe(data => {
      this.category = data as Category;
      this.categoryForm.setValue({
        id: this.category.id,
        categoryName: this.category.name
      });
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      alert("Vui lòng nhập thông tin đúng định dạng.");
      return;
    }

    const idControl = this.categoryForm.get('id');
    const categoryNameControl = this.categoryForm.get('categoryName');

    if (idControl && categoryNameControl) {
      this.category.id = idControl.value;
      this.category.name = categoryNameControl.value;

      // Gửi dữ liệu lên server khi form hợp lệ
      this.categoryService.update(this.id, this.category).subscribe(data => {
        console.log(data);
        this.router.navigate(['/category-list']);
      });
    } else {
      alert("Lỗi khi lấy giá trị của ID hoặc tên danh mục.");
    }
  }
}
