import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public data: any;
  constructor(private api: ApiService, private cartService: CartService) { }
  ngOnInit(): void {

    this.api.getProduct()
      .subscribe(res => {
        this.data = res;
        this.data.forEach((a: any) => {
        })

      })
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item)
  }
}




