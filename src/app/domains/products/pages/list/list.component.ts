import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from "./../../components/product/product.component";
import { Category, Product } from "@shared/models/product.model";
import { HeaderComponent } from "@shared/components/header/header.component";
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  products = signal<Product[]>([]);
  category = signal<Category[]>([]);
  @Input() category_id?: string;

  ngOnChanges(changes: SimpleChanges){
    this.getProducts();
  }

  ngOnInit(){
    //this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) =>{
        this.products.set(products);
      },
      error: (error)=> {
        console.log(error);
      }
    });
  }

  getCategories(){
    this.categoryService.getAllCategories()
    .subscribe({
      next: (category) =>{
        this.category.set(category);
      },
      error: (error)=> {
        console.log(error);
      }
    });
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
}
