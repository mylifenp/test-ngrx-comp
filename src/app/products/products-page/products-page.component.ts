import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductStore } from 'src/app/stores/products.store';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

interface ProductForm {
  name: FormControl<string>;
  category: FormControl<string>;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [ProductStore],
})
export class ProductsPageComponent implements OnInit {
  products$ = this.productStore.products$;
  edit: boolean = false;

  productForm = this.fb.nonNullable.group({
    id: '',
    name: ['', Validators.required],
    category: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productStore: ProductStore,
    private productService: ProductsService
  ) {}

  onSubmit() {
    this.add(this.productForm.getRawValue());
  }

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((products: Product[]) => {
      this.productStore.setState({ products });
      console.log('products', products);
    });
  }

  add(product: Product) {
    this.productStore.addProduct(product);
    this.productForm.reset();
  }

  deleteProduct(id: string | number) {
    this.productStore.removeProduct(id);
  }

  editProduct(product: Product) {
    this.edit = true;
    this.productForm.patchValue(product);
  }

  updateProduct() {
    this.productStore.updateProduct(this.productForm.getRawValue());
    this.edit = false;
  }
}
