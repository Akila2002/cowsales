import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import {HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './pages/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPageComponent } from './pages/order-page/order-page.component';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';
import { FooterComponent } from './pages/footer/footer.component';
import { HistoryComponent } from './history/history.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    ProductComponent,
    OrderPageComponent,
    FooterComponent,
    HistoryComponent,
    

   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false}
    // )


  
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
