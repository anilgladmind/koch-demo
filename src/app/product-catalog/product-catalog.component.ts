import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  public products:any;

  constructor(private service:AppService) {
    this.products = this.service.products;

    // Price Range
    this.service.sortOfProducts.subscribe(items=>{
      this.products = items;
    })
  }

  ngOnInit() {
  }

  addCart(value){
    this.service.addToCart.next(value);
  }

}
