import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,Params, Router } from '@angular/router';
import { OverallServeice } from '../overall.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

product;
id;
error;
 role=JSON.parse(sessionStorage.getItem('role'));
 mainRole=[];
wishlist:any;
details;
baseURL="http://192.168.1.18:8080/ShoppingCart";

  constructor(private route:ActivatedRoute,
              private router:Router,
              private overallService:OverallServeice,
              private title: Title) { }

  ngOnInit() {

    if(this.role){
      for(let i=0;i<this.role.length;i++){
        this.mainRole.push(this.role[i].roleId)
      }}
    
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id']
          
         this.getInfo()
         if(this.product){
           this.error=""
         }

    })

    
    if(localStorage.getItem('token')){
      console.log('tokennn')
    }
    else{
      this.router.navigate(['/signin'])
      console.log('no token')
    }
   this.title.setTitle('Product Details')
  
   this.overallService.emitRole.subscribe(role=>{
    // this.role=role
  })
   
   
  }

  getAdminInfo(){
    this.overallService.getProductById(this.id)
    .subscribe(data=>{
      this.product=data
    },error=>{this.error=error})
  }

getInfo(){
  this.overallService.getProductById(this.id)
  .subscribe(data=>{
    console.log("data", data.StatusCode)
    this.product=data
    this.product['inWishlist']=false
    this.overallService.getUserWishlist()
    .subscribe(wishlist=>{
      this.wishlist=wishlist
      this.wishlist.forEach(item => {
        //console.log('item',item)
        
        if(item.productId==this.product.productId){
          this.product['inWishlist']=true
        }
      });
    })
  },
  error=>{this.error=error
  console.log('erreee',error.status)
  }
  )
}

  addToWishlist(productId){
    console.log(productId),
    
    this.overallService.addProductToWishlist(productId)
    .subscribe(sub=>{
      console.log('sub',sub)
      this.getInfo()
},error=>{alert('something went wrong please try again')}
)
  }
  
}
