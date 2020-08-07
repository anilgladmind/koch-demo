import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { $ } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'koch-demo';
  sorting:any = '';

  constructor(private service: AppService, public router: Router) {
  }

  ngOnInit(){
    console.log(this.sorting);
  }

  getPriceRangeValues($event){
    this.service.priceRange.next($event);
  }

  sortProducts(event){
    this.service.sortingItems(this.sorting);
  }
}
