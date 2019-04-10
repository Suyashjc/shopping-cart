import { Component, OnInit, Inject, OnChanges} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OverallServeice } from '../overall.service';

import { DOCUMENT, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  wishlist: any;
  category;
  id;
  role=JSON.parse(sessionStorage.getItem("role"));
  mainRole=[];
  size = 40;
  page = localStorage.getItem('pageNumber');
  pageNumber;
  error;
  noData=false;
  adminProducts;
  add='?v='+ Date.now().toString();
  baseURL = "http://192.168.1.18:8080/ShoppingCart";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private overallSevice: OverallServeice,
    private title: Title) {
    this.error=""
    console.log('prodRol',this.role)
    if(this.role){
      for(let i=0;i<this.role.length;i++){
        this.mainRole.push(this.role[i].roleId)
      }}
    this.datadisplay()
  }

  ngOnInit() {
    this.title.setTitle("Products")
   

    console.log('pageNumber', localStorage.getItem('pageNumber'))
    this.router.events.subscribe(event => {
      this.page = localStorage.getItem('pageNumber')
      // console.log('event', event)
    })

    if (localStorage.getItem('token')) {
      console.log('tokennn')
    }
    else {
      this.router.navigate(['/signin'])
      console.log('no token')
    }
    this.overallSevice.emitRole.subscribe(data => {
      // this.role = data
      this.datadisplay()
    })
    //this.products=this.overallSevice.getAllProductsOfCategory()
  }


  datadisplay() {
    // this.count++;
    this.route.params.subscribe((params: Params) => {
      console.log('ghg', params['id'])
      this.noData=false
      this.id = params['id']
      if (this.mainRole.includes(1)) {
        this.getInfo()
      }
      else {

        this.getAdminProducts()
      }
      if(this.products){
        this.error=""
        
      }

      //this.pageNumber= this.route.snapshot.queryParamMap.get('pageNumber');
      console.log('pg', this.pageNumber)

    })
  }


  
  getAdminProducts() {
    this.overallSevice.getProductCount(this.id)
      .subscribe(count => {
        console.log('cc', count)
        this.size = count
      });
    this.overallSevice.getProductsByCategory(this.id, localStorage.getItem('pageNumber'))
      .subscribe(data => {
        console.log('dadad',data)
        this.category = data['category']
        this.products = data.products
        if(!data.products){
         this.noData=true
        }
        console.log('addpro1', this.adminProducts)
      },error=>{this.error=error})
  }

  getInfo() {
    this.overallSevice.getProductCount(this.id)
      .subscribe(count => {
        console.log('cc', count)
        this.size = count
      });

    this.overallSevice.getUserWishlist()
      .subscribe(wishlist => {
        this.wishlist = wishlist
        this.overallSevice.getProductsByCategory(this.id, localStorage.getItem('pageNumber'))
          .subscribe(data => {
            this.category = data['category']
            this.products = data['products']
            if(!data.products){
              this.noData=true
             }
            console.log('prod11', this.products)
            if(this.products){
            this.products.forEach(product => {
              product['inWishlist'] = false
              this.wishlist.forEach(item => {
                if (item.productId == product.productId) {
                  product['inWishlist'] = true
                }
              });
            });
          }

            console.log('newCall', this.products)
          },
            error => {
              this.error = error
              console.log('error11', error)}

          )
      },error=>{this.error=error})

  }
  addNewProducts(id){
    sessionStorage.setItem('categoryIdToNav',id)
    this.router.navigate(['/newProduct'])
  }

  addToWishlist(productId) {
    console.log(productId),

      this.overallSevice.addProductToWishlist(productId)
        .subscribe(sub => {
          console.log('sub', sub)

          this.getInfo()
        }, error => {
          alert('something went wrong please try again');
          this.error = error
        }
        )
  }

  getProductDetail(productId) {
    console.log('product', productId)
    this.router.navigate(['/product/' + productId])

  }

  onPageClick(data) {
    
    var element = document.getElementById("try");
    element.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
    // window.scrollTo(0, 0);
 
    localStorage.setItem('pageNumber', data)
    if (this.mainRole.includes(1)) {

      this.getInfo()
    }
    else {
      this.getAdminProducts()
    }
  }

  deleteProduct(id) {

    if (confirm("Are you sure u want to delete the product?")) {
      this.overallSevice.deleteProduct(id)
        .subscribe(response => {
          this.getAdminProducts()
        },
          error => { alert('Something went wrong. Please try again') }
        )
    }
  }

  editProduct(id) {
    this.router.navigate(['/editProduct/' + id])
  }
}
