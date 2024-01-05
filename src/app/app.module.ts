import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AvailableComponent } from './pages/available/available.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import {HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './pages/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPageComponent } from './pages/order-page/order-page.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AvailableComponent,
    LoginComponent,
    ContactComponent,
    CartComponent,
    ProductComponent,
    OrderPageComponent

   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }