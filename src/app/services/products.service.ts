import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../stores/products.store';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8081/api/products');
  }
  addProduct(product: Product) {
    return this.httpClient.post<Product>(
      'http://localhost:8081/api/products',
      product
    );
  }
  updateProduct(product: Product) {
    console.log('product', product);
    return this.httpClient.put<Product>(
      `http://localhost:8081/api/products/${product.id}`,
      product
    );
  }
  deleteProduct(id: string | number) {
    return this.httpClient.delete(`http://localhost:8081/api/products/${id}`);
  }
}
