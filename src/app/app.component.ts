  import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  public totalItem:number=0;
  

  constructor(private cartService:CartService){}
  
  ngOnInit(): void {
    

    this.cartService.getProducts()
    
    .subscribe(res=>{

      this.totalItem=res.length;

    })
    
  }
  
  
}
