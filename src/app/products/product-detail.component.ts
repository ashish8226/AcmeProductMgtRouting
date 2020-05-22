import {Component, OnInit} from '@angular/core';

import {Product, ProductResolved} from './product';
import { ProductService } from './product.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService,private route:ActivatedRoute) { }



  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  ngOnInit(): void {
    const resolvedData:ProductResolved =this.route.snapshot.data['resolvedData'];
    const error=resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }
}
