import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  product!: Product;
  categories!: Category[];
  id: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.id = route.snapshot.params['id'];
    this.productForm = new FormGroup({
      'productId': new FormControl('', Validators.required),
      'productName': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'productImageUrl': new FormControl('', Validators.required),
      'productPrice': new FormControl('', Validators.required),
      'productCategoryId': new FormControl('', Validators.required),
      'productDescription': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.productService.get(this.id).subscribe(data => {
      this.product = data as Product;
      console.log("Fetched product: ", this.product);  // Debug statement
      this.productForm.patchValue({
        productId: this.product.id,
        productName: this.product.name,
        productImageUrl: this.product.img,
        productPrice: this.product.price,
        productCategoryId: this.product.categoryId,
        productDescription: this.product.description
      });  // Update form with product data
    });

    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
      console.log("Fetched categories: ", this.categories);  // Debug statement
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return console.log('Form is invalid');
    }

    const productIdControl = this.productForm.get('productId');
    const productNameControl = this.productForm.get('productName');
    const productImageUrlControl = this.productForm.get('productImageUrl');
    const productPriceControl = this.productForm.get('productPrice');
    const productCategoryIdControl = this.productForm.get('productCategoryId');
    const productDescriptionControl = this.productForm.get('productDescription');

    if (productIdControl && productNameControl && productImageUrlControl && productPriceControl && productCategoryIdControl && productDescriptionControl) {
      this.product.id = productIdControl.value;
      this.product.name = productNameControl.value;
      this.product.img = productImageUrlControl.value;
      this.product.price = productPriceControl.value;
      this.product.categoryId = productCategoryIdControl.value;
      this.product.description = productDescriptionControl.value;

      console.log("Updated product data: ", this.product);  // Debug statement

      this.productService.update(this.id, this.product).subscribe(data => {
        console.log("Update response: ", data);  // Debug statement
        this.router.navigate(['/product-list']);
      }, error => {
        console.error("Update error: ", error);  // Error handling
      });
    }
  }

  onCancel() {
    this.router.navigate(['/product-list']);
  }
}
