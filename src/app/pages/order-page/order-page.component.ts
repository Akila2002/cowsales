import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  public grandTotal: number = 0;
  constructor(private cart:CartService, private router: Router) { }
  ngOnInit(): void {
    this.grandTotal = this.cart.getTotalPrice();
    setTimeout(() => {
      this.router.navigate(["/"])
      this.cart.removeAllCart();
    }, 2000);

  }


}
