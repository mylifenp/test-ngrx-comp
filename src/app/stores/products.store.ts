import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products.service';

export interface Product {
  id: string;
  name: string;
  category: string;
}

export interface ProductsState {
  products: Product[];
}
@Injectable({
  providedIn: 'root',
})
export class ProductStore extends ComponentStore<ProductsState> {
  readonly products$: Observable<Product[]> = this.select(
    (state) => state.products
  );
  constructor(private readonly productService: ProductsService) {
    super({ products: [] });
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe((product) => {
      this.patchState((state) => ({
        products: [...state.products, product],
      }));
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe((product) => {
      this.patchState((state) => {
        const index = [...state.products].findIndex((p) => p.id === product.id);
        if (index === -1) {
          return { products: [...state.products, product] };
        } else {
          return {
            products: [
              ...state.products.map((item) =>
                item.id === product.id ? product : item
              ),
            ],
          };
        }
      });
    });
  }

  removeProduct(id: string | number) {
    this.productService.deleteProduct(id).subscribe((value) => {
      this.patchState((state) => {
        const products = state.products.filter((product) => product.id !== id);
        return { products };
      });
    });
  }
}
