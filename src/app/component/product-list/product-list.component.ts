import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    return this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
      console.log(this.products);
    })
  }

  deleteProduct(id: string) {
    const result = confirm('Muốn xóa à ?');
    if (result) {
      this.productService.delete(id).subscribe(data => {
        console.log(data);
        this.products = this.products.filter(product => product.id !== id);
        this.router.navigate(['/product-list']);
      });
    }
  }

}
