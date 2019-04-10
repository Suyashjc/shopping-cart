import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { OverallServeice } from '../overall.service';
import { Router } from '@angular/router';
import { VALID } from '@angular/forms/src/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
info;
obj;
accountForm:FormGroup;
addCount;
error;
submitError;
val;
hello = false;
edit=false;
profilePicture="";
uploadPicture:File;
uploadError;
baseURL="http://192.168.1.18:8080/ShoppingCart";


  constructor(private overallService:OverallServeice,
              private router:Router,
              private title: Title) {
           this.start()
   }

start(){
   this.overallService.getUserDetails()
   .subscribe(response=>{
   this.info=response
   console.log('inffpp',this.info)
     //console.log('info',this.info)
     this.formInit()
   
     this.addCount=(<FormArray>this.accountForm.get('address')).length
    // console.log('count',this.addCount)
     this.val=this.info.gender
    // this.profilePicture = '';
       this.profilePicture=this.baseURL + response.profilePicture +'?v='+ Date.now().toString();
  
   },
   error=>{this.error=error;
     
    })
  }


  ngOnInit() {
    if(localStorage.getItem('token')){
      
    }
    else{
      this.router.navigate(['/signin'])
      
    }
  this.title.setTitle('Account')
  }

  onDeleteAddress(index:number,address){
    

     (<FormArray>this.accountForm.get('address')).removeAt(index)
    this.addCount=this.addCount-1
    }
    

  // onAddAddress(){
  //   this.addCount=this.addCount+1;
  //  // console.log('count',this.addCount);

  //   (<FormArray>this.accountForm.get('address')).push(new FormGroup({
  //     'addressId':new FormControl(""),
  //     'address':new FormControl(null,
  //       [Validators.required,,Validators.minLength(10),Validators.maxLength(120)]),
  //     'state': new FormControl(null,
  //       [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
  //     'city':new FormControl(null,
  //       [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
  //     'pincode':new FormControl(null,
  //       [Validators.required,Validators.minLength(4),Validators.maxLength(10),Validators.pattern('[0-9]*')])
  //   }))
  // }

  formInit(){
    let firstName=this.info.firstName;
let lastName=this.info.lastName;
let phoneNumber=this.info.phoneNumber;
let email=this.info.email;
let gender=this.info.gender;
let address= new FormArray([])


if(this.info.address.length>0)
{
  for(let add of this.info.address)
  {
    address.push(new FormGroup({
      'addressId':new FormControl(add.addressId),
      'address':new FormControl(add.address,
        [Validators.required,,Validators.minLength(10),Validators.maxLength(120)]),
      'state': new FormControl(add.state,
        [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
      'city':new FormControl(add.city,
        [Validators.required,Validators.minLength(2),Validators.maxLength(15)]),
      'pincode':new FormControl(add.pincode,
        [Validators.required,Validators.minLength(4),Validators.maxLength(9),Validators.pattern('[0-9]*')])
    }))
  }
}

this.accountForm=new FormGroup({
 
  'firstName':new FormControl(firstName,[ Validators.required
  ,Validators.pattern('[A-Za-z]*'),Validators.minLength(1),Validators.maxLength(15)]),
  'lastName':new FormControl(lastName, [ Validators.required
  ,Validators.pattern('[A-Za-z]*'),Validators.minLength(1),Validators.maxLength(20)]),
  'phoneNumber':new FormControl(phoneNumber,[Validators.required]),
  'email':new FormControl(email,[Validators.required,
    Validators.minLength(1),Validators.maxLength(40),
    Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')]),
   'gender':new FormControl(gender,[Validators.required]),
   address:address
})
  }


  onSubmit(){
    if(this.accountForm.valid){
     // console.log(this.accountForm.value)
      this.obj=this.accountForm.value
    //  console.log('obj',this.obj.firstName)
      this.overallService.editUser(this.obj).subscribe(
        response=>{alert(response['message'])
        if(this.submitError){
          alert('something went wrong please try again')
        }
        else{this.router.navigate(['/home'])}
      },error=>{
        this.submitError=error       
      })
    }else{
      alert('Error!! Please check all the fields')
     // console.log('not Valid')
    }   
  }

  isNumberKey(evt){
    var charCode = evt.key

    if (!(charCode < 48 || charCode > 57))
        return false;

    return true;
}

  editMode(){
    this.edit=!this.edit
  }

  onFileSelected(event){
    this.uploadPicture=<File>event.target.files[0];
   // console.log('onCunage',this.uploadPicture)
  }

  onUpload(){
    let fg=new FormData()
    fg.append('file',this.uploadPicture,this.uploadPicture.name)
    
     // console.log('fg',this.uploadPicture,fg.get('file'))
      
      this.overallService.onUpload(fg)
      .subscribe(response=>{
       // console.log('newImage', response['fileName'])
       this.profilePicture= this.baseURL + response['fileName']
         
        // console.log('proPicNew',this.profilePicture)         
          this.start();       
          this.edit=!this.edit;
         
      },
    error=>{this.uploadError=error
    //  console.log("big image",error.error)
      alert(error.error)}
     
    );
  //    if(this.uploadError){
  //      alert('something went wrong')}
  //   else{
  //     alert('image uploaded');}
  //   
   }
}
