import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('');

  ngOnInit(){
    if (this.id){
      this.productService.getOne(this.id)
      .subscribe({
        next: (product)=>{
          this.product.set(product);
          if(product.images.length>0){
            this.cover.set(product.images[0])
          }
        },
        error: (error)=>{
          console.log(error);
        }
      })
    }
  }

  onChangeImage(url: string){
    this.cover.set(url);
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

}
