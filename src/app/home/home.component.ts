import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OverallServeice } from '../overall.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mainObj: any[]
  subcribtion
  error
  role = JSON.parse(sessionStorage.getItem("role"));
  wishlist: any[]
  mainRole = []

  baseURL = "http://192.168.1.18:8080/ShoppingCart"
  constructor(private router: Router,
    private overallService: OverallServeice,
    private title: Title) { }

  ngOnInit() {

    if (this.role) {
      for (let i = 0; i < this.role.length; i++) {
        this.mainRole.push(this.role[i].roleId)
      }
    }

    if (localStorage.getItem('token')) {
      console.log('tokennn')
    }
    else {
      this.router.navigate(['/signin'])
      console.log('no token')
    }

    // this.overallService.emitRole.subscribe(role=>{
    //   this.role=role})

    if (this.mainRole.includes(1)) {
      this.getUserHome()
    }
    else { this.getAdminHome() }

    // this.wishlist=JSON.parse(localStorage.getItem('wishlist'))
    this.title.setTitle('Home');


    localStorage.setItem('pageNumber', "1")

  }
  getAdminHome() {
    this.overallService.getHome()
      .subscribe(response => {
        console.log('addHome', response)
        this.mainObj = response
      }, error => { this.error = error })
  }

  getUserHome() {
    this.overallService.getUserWishlist()
      .subscribe(wishlist => {
        this.wishlist = wishlist
        this.overallService.getHome()
          .subscribe(response => {
            this.mainObj = response
            console.log("response", response);
            response.forEach(main => {
              console.log("main", main)
              if (main.products) {
                main.products.forEach(product => {
                  product['inWishlist'] = false
                  this.wishlist.forEach(item => {
                    if (item.productId == product.productId) {
                      product['inWishlist'] = true
                    }
                  });
                });
              }
            });
            console.log('check', this.mainObj)
          },
            error => {
              this.error = error
              console.log('error', error)

            })
      }, error => { this.error = error })
  }

  addToWishlist(productId) {
    console.log(productId),
      this.subcribtion = this.overallService.addProductToWishlist(productId)
        .subscribe(sub => {
          console.log('sub', sub)

          this.getUserHome()
        }, error => { alert('something went wrong please try again') }
        )


  }

  seeAllProducts(cateogryId) {
    this.router.navigate(['/products/' + cateogryId])
  }

  getProductDetails(productId) {
    console.log('product', productId)
    this.router.navigate(['/product/' + productId])
    // this.overallService.setRequiredProduct(product)
  }
}
