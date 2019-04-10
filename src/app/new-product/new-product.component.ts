import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OverallServeice } from '../overall.service';
import {  Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productForm:FormGroup;
  categories;
  uploadPicture:File;
  notImage=true;
  default=+sessionStorage.getItem("categoryIdToNav");
  showImageError=false;

  constructor(private overallService:OverallServeice,
                private route:Router,
                private title: Title) { 
    this.overallService.getCategories()
    .subscribe(response=>{
      
      this.categories=response
      console.log('edcat',this.categories)
      this.formInit()
    })
  }

  ngOnInit() {
    this.title.setTitle('Add-Product')
  }

formInit(){
  this.productForm=new FormGroup({
    'productName':new FormControl('',
    [Validators.required,Validators.minLength(1),Validators.maxLength(25)]),
    'productDescription':new FormControl('',
    [Validators.required,Validators.minLength(5),Validators.maxLength(120)]),
    'productDetails':new FormControl('',
    [Validators.required,Validators.minLength(1),Validators.maxLength(60)]),
    'price':new FormControl('',
    [Validators.required,Validators.minLength(1),Validators.maxLength(7)]),
    'priceUnit':new FormControl('',
    [Validators.required,Validators.minLength(1),Validators.maxLength(3)]),
    'category':new FormControl(this.categories,Validators.required),
  }) 
  this.productForm.controls['category'].setValue(this.default, {onlySelf:true});
 
}

isNotNumberKey(evt){
  var charCode = evt.key

  if ((charCode < 48 || charCode > 57))
      return false;

  return true;
}

onFileSelected(event){
  this.uploadPicture=<File>event.target.files[0];
 // console.log('onCunage',this.uploadPicture)
 if(this.uploadPicture){
  this.notImage=false
 }
 else{
   this.notImage=true
 }

 if(!this.notImage){
   this.showImageError=false
 }
 else{
   this.showImageError=true
 }
}



onSubmit(){
  if(!this.notImage){
  if(this.productForm.valid){

    
      console.log(this.productForm.value)
      let fg=new FormData()
      fg.append('image',this.uploadPicture,this.uploadPicture.name)
      fg.append('productName',this.productForm.value.productName)
      fg.append('productDescription',this.productForm.value.productDescription)
      fg.append('productDetails',this.productForm.value.productDetails)
      fg.append('price',this.productForm.value.price)
      fg.append('priceUnit',this.productForm.value.priceUnit)
      fg.append('category.categoryId',this.productForm.value.category)
  
      this.overallService.addNewProduct(fg)
      .subscribe(response=>{
        alert(response['message'])
        if(response['message']=='success'){
          this.route.navigate(['/products/'+sessionStorage.getItem('categoryIdToNav')],
          {queryParams:{'pageNumber':localStorage.getItem('pageNumber')}})
        }
      },
    error=>{console.log(error)}
    )
    }
   
    } else{
      this.showImageError=true
    }
 }
}
