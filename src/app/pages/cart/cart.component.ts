import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  router: any;
  data: any;
  items: any;
  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.product = res;
      this.updateGrandTotal();
      this.grandTotal = this.cartService.getTotalPrice();
      console.log("total price is", this.grandTotal);
    });

    this.aki = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  updateGrandTotal() {
    this.grandTotal = this.cartService.getTotalPrice();
    console.log("Total price is", this.grandTotal);
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

  postdata() {
    this.http.post("http://localhost:3000/products", this.aki.value).subscribe(((res: any) => {
      console.log(this.aki.value);
      alert("Submit Successfully");
    }));
  }
}

  // onsubmit() {
  //   this.aki.value;
  //   console.log(this.aki.value)
  //   this.aki.reset();
  // }


