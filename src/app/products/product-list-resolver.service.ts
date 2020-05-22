import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product, ProductListResolved, ProductResolved} from "./product";
import {Observable, of} from "rxjs";
import {ProductService} from "./product.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn:"root"
})
export class ProductListResolverService implements Resolve<ProductListResolved>{
  constructor(private productService:ProductService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductListResolved>{
    return this.productService.getProducts().pipe(
      map( products => ({products:products})),
      catchError(err => {
        const message=`Retrieved error : ${err}`;
        console.error(message);
        return of({products:[],error:message});
      })
    );
  }

}
