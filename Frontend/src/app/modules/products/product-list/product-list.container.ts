import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Product, ProductService } from '../../../core'; // Import Product and ProductService from the appropriate location

@Component({
  selector: 'app-product-list-container',
  template: `
    <app-product-list
      [products]="products"
      (filtered)="filter($event)"
    ></app-product-list>
  `
})
export class ProductListContainer implements OnInit, OnDestroy {

  products: Product[] = [];
  filter$ = new Subject<string>();
  subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.filter$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(text => this.productService.findAll(text))
      ).subscribe(
        results => {
          this.products = results;
        }
      )
    )
    this.filter$.next('');
  }

  filter(text: string) {
    this.filter$.next(text);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
