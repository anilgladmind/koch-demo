import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: any = [];
  grandTotal: number = 0;

  constructor(private service: AppService) {
    this.products = this.service.uniqueItems(this.service.checkoutItems);
    
    this.service.cartProducts.subscribe(values=>{
      this.products = this.service.uniqueItems(values);
      this.grandTotal = this.service.grandTotal(this.products);
    });
  }

  ngOnInit() {
    this.grandTotal = this.service.grandTotal(this.products);
  }

}
