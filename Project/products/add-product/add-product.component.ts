import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // For handling forms
import { ProductService } from '../../service/product.service'; // Importing the ProductService
import { Router } from '@angular/router'; // For navigation after successful product addition
import { Product } from '../../model/product'; // The Product model
import { CommonModule } from '@angular/common'; // Import CommonModule to use ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms'; // For form handling
import { HttpErrorResponse } from '@angular/common/http'; // For error handling

@Component({
  selector: 'app-add-product',
  standalone: true,  // Mark the component as standalone
  imports: [FormsModule, CommonModule], // Ensure CommonModule is imported here
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  // Define the product object that will be sent to the backend
  product: Product = {
    id: 11,
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    sku: '',
    category: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  // Method for handling form submission
  onSubmit(productForm: NgForm) {
    if (productForm.valid) {
      // Call the createProduct method from ProductService
      this.productService.createProduct(this.product).subscribe(
        (response) => {
          this.successMessage = 'Product added successfully!';
          this.errorMessage = ''; // Clear any previous error messages
          productForm.reset({
            name: '',
            description: '',
            price: 0,
            stockQuantity: 0,
            sku: '',
            category: ''
          });  // Reset the form fields
          // Navigate to the products list page after success
          this.router.navigate(['/product-list']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.errorMessage = 'Unable to connect to the server. Please try again later.';
          } else {
            this.errorMessage = 'Error adding product! Please try again.';
          }
          console.error('Error:', error);
        }
      );
    }
  }

  // Method for handling dashboard navigation
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
