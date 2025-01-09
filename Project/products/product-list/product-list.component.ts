import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, RouterLink], // Correcting the imports
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Fetch products when component initializes
    this.loadProducts(); // Call loadProducts on init
  }

  // Define the loadProducts method to fetch products
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  // Navigate to the edit page for a product
  editProduct(productId: number | undefined): void {
    if (productId) {
      this.router.navigate(['/edit-product', productId]);  // Navigate to the edit-product route with the ID
    } else {
      console.error('Product ID is not available');
      alert('Product ID is not available');
    }
  }
  
  // Delete product by ID
  deleteProduct(productId: number | undefined): void {
    if (productId) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          console.log('Product deleted successfully');
          alert('Product deleted successfully');
          this.loadProducts(); // Reload the product list after deletion
        },
        error => {
          console.error('Error deleting product', error);
          alert('Error deleting product');
        }
      );
    } else {
      console.error('Product ID is not available for deletion');
      alert('Product ID is not available for deletion');
    }
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
