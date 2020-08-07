import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './left-nav/left-nav.component';

import { Ng5SliderModule } from 'ng5-slider';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCatalogComponent,
    HeaderComponent,
    LeftNavComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    Ng5SliderModule,HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
