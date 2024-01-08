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
    this.fetchData();
  }

  fetchData() {
    this.api.getProduct().subscribe(
      (res: any) => {
        this.data = res;
        // Perform additional operations with the fetched data if needed
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        // Handle the error scenario, e.g., display an error message
      }
    );
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
}
