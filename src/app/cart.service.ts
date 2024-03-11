import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './pages/product/productmodal';
import { Order } from './pages/cart/Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private orderUrl = 'api/Order';  // Update with your actual API endpoint for placing orders

  public amount: number = 0;
  public cartItemList: Product[] = [];
  public data = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  Order(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order);
  }



  getOrderHistory(): Observable<any> {
    return this.http.get('https://6529ee5555b137ddc83f33c3.mockapi.io/info');
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
    this.data.next([...this.cartItemList]);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      return grandTotal += parseFloat(item.price);
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((item) => item.id !== product.id);
    this.data.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.data.next(this.cartItemList);
  }
}
