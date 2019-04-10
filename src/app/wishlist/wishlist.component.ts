import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverallServeice } from '../overall.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  products: any = [];
 error;
 baseURL="http://192.168.1.18:8080/ShoppingCart";

  constructor(private router: Router,
    private overallService: OverallServeice,
    private title: Title) {
    this.wishlist();
  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      console.log('tokennn')
    }
    else{
      this.router.navigate(['/signin'])
      console.log('no token')
    }
    this.title.setTitle('Wishlist');
  }


  wishlist() {
    this.overallService.getUserWishlist()
      .subscribe(response => {
        console.log('list', response)
        this.products = response
      },
    
    error=>{this.error=error
    console.log('ssssqa',this.error)
   }
  )
  }
  
  getProductDetails(productId) {
    console.log('product', productId)
    this.router.navigate(['/product/'+productId])
  }

  removeProduct(id) {
    if(confirm("Are u sure you want to delete?")){
    console.log('proddel', id)
    this.overallService.deleteProductFromWishlist(id)
      .subscribe(response => {
        console.log(response)
        
        this.wishlist();

      },error=>{alert('something went wrong try again')})
      
  }}
}
