import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './pages/product/productmodal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  name: string;
  mobile: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {


  public amount: number = 0;
  public cartItemList: Product[] = []
  public data = new BehaviorSubject<Product[]>([]);





  private apiUrl = 'api/orders';

  constructor(private http: HttpClient) { }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }






  getProducts() {
    return this.data.asObservable();
  }
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.data.next(product);
  }


  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.data.next([...this.cartItemList]); // Emit a new array to trigger update
    this.getTotalPrice(); // Update grandTotal with new total
    console.log(this.cartItemList);
  }

  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      return grandTotal += parseFloat(item.price);
    })
    return grandTotal;
  }

  // getTotalPrice() {
  //   let grandTotal = 0;
  //   this.cartItemList.forEach((item: any) => {
  //     grandTotal += parseFloat(item.price.replace(',', '').replace('-', '').trim()); // Handle price formatting if necessary
  //   });
  //   return grandTotal;
  // }


  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.data.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.data.next(this.cartItemList);
  }
}



