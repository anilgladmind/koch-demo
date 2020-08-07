import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})

export class AppService {
    
    private _count:number=1;

    private productsObj: any = [
        {
            "name": "Toy Car",
            "price": 250,
            "image": "https://images.ctfassets.net/bkp1t915hkvx/wtrHxeu3zEoEce2MokCSi/63f9fe1bbc51ea842c133d6e08621776/quwowooybuqbl6ntboz3.jpg",
            "available": 10
        },

        {
            "name": "Seal-A-Gap",
            "price": 489,
            "image": "https://lh4.googleusercontent.com/proxy/IREebumBABiyxwBNKsuoeNAuETJdpLsd8NWw-ef7V00chzxTPHc0v72i4TdVjxTpbGYLEAM_7jy3BxLPC0az7Ag7sZIjWilq15Sf5gnD2kbXoQ2ZHjCk_ARCWjdwHIy2E_6_IbfOgDFl2JW1",
            "available": 11
        },

        {
            "name": "Mr.Magic kit",
            "price": 679,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMQ-CUdeyP589DaClEgc54NEzmZ2BIc4saY9vTIbv_Gux2IU&s",
            "available": 2
        },

        {
            "name": "EA Diamonds",
            "price": 7679,
            "image": "https://www.luxuryperfumes.in/wp-content/uploads/2018/06/Emporio20Armani20Diamonds20Black20Carat20Perfume-W-600x446.jpg",
            "available": 5
        },

        {
            "name": "Marine",
            "price": 4679,
            "image": "https://aoratosnature.com/wp-content/uploads/2020/01/Collagen1-600x446.jpg",
            "available": 3
        },

        {
            "name": "Toffee",
            "price": 56,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmwb_6H6MU5bI7H9tRKpgjrwPmQrDuSdT_7NfieKbZydxj6zvs&s",
            "available": 10
        },

        {
            "name": "Ostarine",
            "price": 568,
            "image": "https://www.europharmma.com/wp-content/uploads/2019/08/ostarine-600x446.jpg",
            "available": 100
        },

        {
            "name": "Hi-Focus Camera",
            "price": 5689,
            "image": "https://hifocuscctv.com/wp-content/uploads/2017/07/Untitlednew2-600x446.png",
            "available": 45
        },

        {
            "name": "Enrico",
            "price": 9999,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1XPMiyngyfWeTMG4jTXneUBbg2-WSxxVR33sZxhaaxNW7Nr0k&s",
            "available": 78
        },

        {
            "name": "LV Pont",
            "price": 1999,
            "image": "https://www.sandrascloset.com/wp-content/uploads/2020/05/LV_PONT_9_5-600x446.jpg",
            "available": 7
        }
    ];
    
    // public products: Subject<any> = new Subject();
    public addToCart: Subject<any> = new Subject();
    public cartCount: Subject<number> = new Subject();
    public priceRange: Subject<any> = new Subject();
    public sortOfProducts: Subject<any> = new Subject();
    public cartProducts: Subject<any> = new Subject();

    public checkoutItems: any = [];
    public checkoutItemsCount: any;
    public priceSet: any = {
        maxValue: 0,
        minValue: 0
    }


    public get products(){
        return this.productsObj;
    }

    public get rangeMax(){
        return this.setMinMaxValues().max;
    }

    public get rangeMin(){
        return this.setMinMaxValues().min;
    }

    constructor(private http: HttpClient) {      
        // priceSet
        this.priceSet = {
            maxValue: this.rangeMax,
            minValue: this.rangeMin
        };
        
        // Add To CArt
        this.addToCart.subscribe(v=>{
            this.cartCount.next(this._count++);
            this.checkoutItems.push(v); // cart Items
            this.uniqueItemsAndCount();
            this.cartProducts.next(this.checkoutItems);
        });

        // Price Range
        this.priceRange.subscribe(priceSet=>{
            let items = this.products.filter((e)=>{
                return e.price >= priceSet.minValue && e.price <= priceSet.maxValue
            });
            this.priceSet = priceSet;
            this.sortOfProducts.next(items);
        })
    }
    
    uniqueItemsAndCount() {
        let items = this.checkoutItems;
        let resultOfCounts = items.reduce( (acc, o) => (acc[o.name] = (acc[o.name] || 0)+1, acc), {} );
        this.checkoutItemsCount = resultOfCounts;
    }

    // Search Item
    public searchItem(value){
        let items = this.applyFilter();
        items = items.filter((e)=>{
            return e.name.toLowerCase().includes(value.toLowerCase());
        });
        this.sortOfProducts.next(items);
    }

    public uniqueItems(arr:any){
        let uniqueItems = arr.filter(function(v,i) { return arr.indexOf(v) == i; });
        return uniqueItems;
    }

    // Grand Total
    public grandTotal(items:any){
        let gTotal = 0;
        Array.from(items).forEach((item:any)=>{
            let productValue = item.price * this.checkoutItemsCount[item.name];
            gTotal += productValue;
        });
        return gTotal;
    }

    // Each Product Price with count
    public calculateProductPrice(productPrice,count){
        return productPrice*count;
    }

    public addItem(v:any){
        if(!this.checkoutItemsCount.hasOwnProperty(v.name)){
            this.checkoutItems.push(v); // cart Items
            this.uniqueItemsAndCount();
        }else{
            this.checkoutItemsCount[v.name] = this.checkoutItemsCount[v.name] + 1;
        }
        
        this.cartProducts.next(this.checkoutItems);
    }

    // Remove Item
    public removeItem(v:any){
        console.log(v);
        if(this.checkoutItemsCount.hasOwnProperty(v.name)){
            this.checkoutItemsCount[v.name] = this.checkoutItemsCount[v.name] - 1;
            console.log(this.checkoutItemsCount[v.name]);
            this.cartProducts.next(this.checkoutItems);
        }
    }

    // Apply Filter
    public applyFilter(){
        let items = this.products.filter((e)=>{
            return e.price >= this.priceSet.minValue && e.price <= this.priceSet.maxValue
        });
        return items;
    }

    // sorting
    public sortingItems(value:string){
        let items = this.applyFilter();
        switch(value){
            case 'asc': {
                items = items.sort(this.dynamicsort('name','asc'));
                break;
            }
            case 'desc': {
                items = items.sort(this.dynamicsort('name','desc'));
                break;
            }
            case 'htl': {
                items = items.sort(this.dynamicsort('price','desc'));
                break;
            }
            default: {
                items = items.sort(this.dynamicsort('price','asc'));
                break;
            }
        }
        console.log(items);
        this.sortOfProducts.next(items);
    }


    // private 
    // dynamic sorting
    dynamicsort(property,order) {
        var sort_order = 1;
        if(order === "desc"){
            sort_order = -1;
        }
        return function (a, b){
            // a should come before b in the sorted order
            if(a[property] < b[property]){
                    return -1 * sort_order;
            // a should come after b in the sorted order
            }else if(a[property] > b[property]){
                    return 1 * sort_order;
            // a and b are the same
            }else{
                    return 0 * sort_order;
            }
        }
    }


    // set Min Max values
    //Min and Max price for price range
    setMinMaxValues(){
        let max = Math.max.apply(Math, this.productsObj.map(function(o) { return o.price; }));
        let min = Math.min.apply(Math, this.productsObj.map(function(o) { return o.price; }));
        return {min:min,max:max};
    }

    sortProducts(){
        this.getProducts().subscribe((v:any)=>{
            return v.products;
        });
    }

    // HTTP
    getProducts(){
        return this.http.get('/assets/json/products.json');
    }

}