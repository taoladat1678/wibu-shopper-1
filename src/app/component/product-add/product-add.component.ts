import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  category!: Category[];

  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router) {
    this.product = new Product();
    this.productForm = new FormGroup({
      'productName': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'productImageUrl': new FormControl('', Validators.required),
      'productPrice': new FormControl('', Validators.required),
      'productCategoryId': new FormControl('', Validators.required),
      'productDescription': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.category = data as Category[];
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert("Vui lòng nhập thông tin đúng định dạng.");
      console.log('Form validation errors:', this.productForm.errors);
      return;
    }

    // Lấy giá trị từ form và gán cho product
    const productNameControl = this.productForm.get('productName');
    const productImageUrlControl = this.productForm.get('productImageUrl');
    const productPriceControl = this.productForm.get('productPrice');
    const productCategoryIdControl = this.productForm.get('productCategoryId');
    const productDescriptionControl = this.productForm.get('productDescription');

    if (productNameControl && productImageUrlControl && productPriceControl && productCategoryIdControl && productDescriptionControl) {
      this.product.name = productNameControl.value;
      this.product.img = productImageUrlControl.value;
      this.product.price = productPriceControl.value;
      this.product.categoryId = productCategoryIdControl.value;
      this.product.description = productDescriptionControl.value;

      // Thêm debug thông tin product để kiểm tra
      console.log('Submitting product:', this.product);

      // Gửi dữ liệu lên server khi form hợp lệ
      this.productService.save(this.product).subscribe(data => {
        console.log(data);
        this.router.navigate(['/product-list']);
      }, error => {
        console.error('Save product error:', error);
      });
    } else {
      alert("Lỗi khi lấy giá trị từ form.");
    }
  }

  onCancel() {
    // Xử lý sự kiện hủy thêm sản phẩm, chuyển hướng đến trang danh sách sản phẩm
    this.router.navigate(['/product-list']);
  }
}
