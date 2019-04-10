import { Component, OnInit } from '@angular/core';
import { OverallServeice } from '../overall.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

 categories;
 category;
 error;
 editMode=false;
 editObj;
 role=sessionStorage.getItem('role');
 showForm=false;
 categoryForm:FormGroup;

  constructor(private overallService:OverallServeice,
              private router:Router,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Edit-Categories')
   this.getCategories()
   this.overallService.emitRole.subscribe(role=>{
    //  this.role=role
     if(this.role=='1'){
       this.router.navigate(['/home'])
     }
   })
  }

  getCategories(){

    this.overallService.getCategories()
    .subscribe(cat=>{
      this.categories=cat
      console.log('catt',this.categories)
    },
    error=>{this.error=error}
  )
  }

  editCategory(id){
    

    this.showForm=!this.showForm
    this.editMode=true
   
    this.overallService.getCategoryById(id)
    .subscribe(data=>{
      this.category=data
      console.log('cattttt',this.category)
      this.categoryForm=new FormGroup({
        'category':new FormControl(this.category.category,
          [Validators.required,Validators.maxLength(25),Validators.minLength(1)]),
          'categoryDescription':new FormControl(this.category.categoryDescription,
          [Validators.required,Validators.maxLength(70),Validators.minLength(5)])
      })
    },
    error=>{this.error=error
    console.log(this.error)})
    if(this.showForm){
      setTimeout(ed=>{
        var element = document.getElementById("form");
        element.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
      },100)
 
  }
  }
  openAddForm(){
    this.showForm=!this.showForm
    this.categoryForm=new FormGroup({
      'category':new FormControl('',
      [Validators.required,Validators.maxLength(25),Validators.minLength(1)]),
      'categoryDescription':new FormControl('',
      [Validators.required,Validators.maxLength(70),Validators.minLength(5)])
    })
    if(this.showForm){
      setTimeout(ed=>{
        var element = document.getElementById("form");
        element.scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
      },100)}
  }

  deleteCategory(id){
    if(confirm('This will delete all the products. Do you want to delete the category?')){
    this.overallService.deleteCategory(id)
    .subscribe(data=>{
      this.getCategories()
      alert(data['message'])
    },error=>{this.error=error})
  }
}

  isNotNumberKey(evt){
    var charCode = evt.key
  
    if ((charCode < 48 || charCode > 57))
        return false;
  
    return true;
  }

  onSubmit(){
    if(this.categoryForm.valid){
      if(this.editMode){
        this.editObj=this.categoryForm.value
        this.editObj['categoryId']=this.category.categoryId
        this.overallService.updateCategory(this.editObj)
        .subscribe(data=>{
          alert(data['message'])
          this.getCategories()
          this.showForm=!this.showForm
          console.log('dada',data)
          this.editMode=false
        }
        ,error=>{if (error.error=="Category Already Present"){
          alert("Category Already Present")
        }
        else{this.error=error}})
      }
      else{
        this.overallService.addNewCategory(this.categoryForm.value)
        .subscribe(data=>{
          console.log('gaga',data)
          this.getCategories()
          alert(data['message'])
          this.showForm=!this.showForm
        },
      error=>{if (error.error=="Category Already Present"){
        alert("Category Already Present")
      }
      else{this.error=error}
      })
      }

    }
  }
}
