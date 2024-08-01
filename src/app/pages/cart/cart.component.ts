  import { Component, OnInit } from '@angular/core';
  import { CartService } from 'src/app/cart.service';
  import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { Router } from '@angular/router';
  import { Order } from './Order';
  @Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
  })
  export class CartComponent implements OnInit {
    public product: any = [];
    public grandTotal: number = 0;
    public addressform = false;
    aki: FormGroup | any;
    
    data: any;
    items: any;
    Order!: any;
    constructor(private cartService: CartService, private http: HttpClient,private router: Router) { }
    ngOnInit(): void {
      this.cartService.getProducts().subscribe(res => {
        this.product = res;
        this.updateGrandTotal();
        this.grandTotal = this.cartService.getTotalPrice();
        console.log("total price is", this.grandTotal);
      });
      this.aki = new FormGroup({
        name: new FormControl('', [Validators.required, this.noWhitespaceValidator()]),
        mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10)]), // Restrict to exactly 10 digits
        address: new FormControl('', [Validators.required, this.noWhitespaceValidator()]) // Apply custom validator to disallow whitespace
      });
    }
    updateGrandTotal() {
      this.grandTotal = this.cartService.getTotalPrice();
      // console.log("Total price is", this.grandTotal);
    }
    removeItem(item: any) {
      this.cartService.removeCartItem(item);
    }
    emptycart() {
      this.cartService.removeAllCart();
    }
    cancel() {
      this.addressform = false;
    }

    noWhitespaceValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        // Check if value contains only whitespace characters
        const isWhitespace = !value || !value.trim();
        // Return validation error if value contains only whitespace characters, otherwise return null
        return isWhitespace ? { 'whitespace': true } : null;
      };
    }
    


    postdata() {
      const orderData = {
        name: this.aki.value.name,
        mobile: this.aki.value.mobile,
        address: this.aki.value.address,
        items: this.product.map((item: any) => {
          return {
            name: item.name,
            price: item.price,
            milk: item.milk,
            state: item.state,
            image: item.image
          };
        })
      };
 // Post checkout form data to Node.js backend
 this.http.post("http://localhost:3000/api/orders", orderData, { responseType: 'text' })
 .subscribe((res: any) => {
   console.log('Response from server:', res);
   alert("Order Successfully");
   this.router.navigate(['/order-page']);
 });
}
  }