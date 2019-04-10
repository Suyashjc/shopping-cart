import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OverallServeice } from '../overall.service';
import { matFormFieldAnimations } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

id;
product;
productImage;
categories=[];
default;
obj;
edit=false;
submitError;
uploadError;
uploadPicture:File;
baseURL="http://192.168.1.18:8080/ShoppingCart";
productForm:FormGroup;

  constructor(private route:ActivatedRoute,
              private overallService:OverallServeice,
            private router:Router,
            private title: Title
            ) { 
                this.route.params.subscribe((params:Params)=>{
                  this.id=params['id']  
                  this.getDetails()     
                //console.log('productInfo',this.product)
                })
               
              }

  ngOnInit() {
    this.title.setTitle('Edit-Product')
  }

  getDetails(){
    this.overallService.getProductById(this.id)
    .subscribe(product=>{
      this.product=product
      this.default=product.category
      this.productImage=this.baseURL+product.productImage+'?v='+ Date.now().toString()
      this.overallService.getCategories()
      .subscribe(response=>{
        
        this.categories=response
        console.log('edcat',this.categories)
      })
      console.log("editProd",this.product)
        this.formInit()
    
    })
    
  }

  formInit(){
    let productName=this.product.productName;
    let productDetails=this.product.productDetails;
    let productDescription=this.product.productDescription;
    let price=this.product.price;
    let priceUnit=this.product.priceUnit;

    this.productForm=new FormGroup({

      'productName':new FormControl(productName,
      [Validators.required,Validators.minLength(1),Validators.maxLength(25)]),
      'productDetails':new FormControl(productDetails,
      [Validators.required,Validators.minLength(1),Validators.maxLength(60)]),
      'productDescription':new FormControl(productDescription,
      [Validators.required,Validators.minLength(5),Validators.maxLength(120)]),
      'price':new FormControl(price,
      [Validators.required,Validators.minLength(1),Validators.maxLength(7)]),
      'priceUnit':new FormControl(priceUnit,
      [Validators.required,Validators.minLength(1),Validators.maxLength(3)]),
      'category':new FormControl(this.categories,Validators.required)
    })
    this.productForm.controls['category'].setValue(this.default.categoryId, {onlySelf: true});
  }
  editMode(){
    this.edit=!this.edit
  }

  onFileSelected(event){
    this.uploadPicture=<File>event.target.files[0];
   // console.log('onCunage',this.uploadPicture)
  }
  
  isNotNumberKey(evt){
    var charCode = evt.key
  
    if ((charCode < 48 || charCode > 57))
        return false;
  
    return true;
  }

  onUpload(){
    let fg=new FormData()
    fg.append('image',this.uploadPicture,this.uploadPicture.name)
    fg.append('productId',this.product.productId)

      
      this.overallService.updateProductImage(fg)
      .subscribe(response=>{
  
         this.productImage=this.baseURL+response['fileName']+'?v='+ Date.now().toString()
         console.log('pimag',response)      
          this.edit=!this.edit;
         
      },
    error=>{this.uploadError=error
      console.log("big image",error)
      alert(error.error)}
     
    );  
   }

  onSubmit(){
    if(this.productForm.valid){
     console.log(this.productForm.value.category)
     var categoryId={"categoryId":this.productForm.value.category}
      this.obj=this.productForm.value
      this.obj['category']=categoryId
      this.obj['productId']=this.product.productId
      console.log(this.obj)
      this.overallService.updateProduct(this.product.productId,this.obj)
      .subscribe(response=>{
        console.log('update response',response)
        alert(response.message)
        if(this.submitError){
          alert('something went wrong please try again')
        }
         else{
          console.log('in else') 
          console.log('navaDa',categoryId.categoryId)
          this.router.navigate(['/products/'+categoryId.categoryId],{queryParams:{'pageNumber':localStorage.getItem('pageNumber')}})
        }
      },error=>{
        this.submitError=error
          
      }
      )
    }else{
      alert('Error!! Please check all the fields')
     // console.log('not Valid')
    }
  }
}
