import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

  
export class EditProductComponent implements OnInit {
  
  product: Product = {
    id: 0, 
    name: '',
    price: 0, stockQuantity: 0, description: '',
    sku: '',
    category: ''
  };
  productId: number = 0;

  constructor(
    public route: ActivatedRoute,
    private productService: ProductService,
    public router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;  // Assign fetched product data to the model
      },
      (error) => {
        console.error('Error loading product', error);
        alert(error)
      }
    );
  }

  // Save the edited product
  saveProduct(): void {
    if (this.product && this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        (updatedProduct: Product) => {
          console.log('Product updated successfully', updatedProduct);
          alert('Product updated successfully')
          this.router.navigate(['/dashboard']);  // Redirect to the dashboard after saving
        },
        (error) => {
          console.error('Error updating product', error);
          alert(error)
        }
      );
    } else {
      console.error('Invalid product or product ID missing');
    }
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}