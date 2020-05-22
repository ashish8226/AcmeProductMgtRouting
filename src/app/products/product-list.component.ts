import { Component, OnInit } from '@angular/core';

import {Product, ProductListResolved, ProductResolved} from './product';
import { ProductService } from './product.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this._listFilter=this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage=this.route.snapshot.queryParamMap.get('showImage')==='true';
    this.route.data.subscribe(data => {
      const resolvedData: ProductListResolved = data['resolvedData'];
      const error = resolvedData.error;
      this.products=resolvedData.products;
      this.filteredProducts=this.performFilter(this.listFilter);
    });
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
