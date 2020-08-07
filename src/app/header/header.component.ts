import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'koch-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private count:number = 0;
  constructor(private service:AppService, public router: Router) {
    this.service.cartCount.subscribe(count=>{
      console.log(count);
      this.count = count;
    })
  }

  ngOnInit() {
  }

  expandSearch(){
    let searchInput = document.getElementById('search-input');
    if(searchInput.classList.contains('active')){
      searchInput.classList.remove('active');
    }else{
      searchInput.classList.add('active');
    }
  }

  searchItem(event:any){
    this.service.searchItem(event.target.value);
  }

}
