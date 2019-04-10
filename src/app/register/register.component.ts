import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OverallServeice } from '../overall.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  inPassword;
  isSame=false;
  afterSumbit=false;
  checkIfStaring=true;
  isInvalid=true;
  error;
  innerRole=sessionStorage.getItem('innerRole');
  role;
  
  constructor(private overallService:OverallServeice,
              private router:Router,
              private title: Title) { }
 
  ngOnInit() {
    this.title.setTitle('Register')
    // localStorage.setItem("role","4")
  }


  onRegister(form: NgForm) {
    if(form.value.password!=form.value.confirmPassword)
    {
      this.afterSumbit=true
    }
    else{
      console.log('newPass',form.value.confirmPassword)
    
    if(form.invalid){
      console.log('formInvalid')
    }
    else{
    console.log('form', form.value);
    var address={
      "address":form.value.address,
      "state":form.value.state,
      "city":form.value.city,
      "pincode":String(form.value.pincode),
    }
    if(this.innerRole=="4"){
      this.role=form.value.role
    }
    else{
      this.role="1"
    }
    var information={
      "firstName":form.value.firstName,
      "lastName":form.value.lastName,
      "gender":form.value.gender,
      "phoneNumber":String(form.value.phoneNumber),
      "email":form.value.email,
     "role":this.role,
      "password":form.value.password,
      "address":[address]

    }
    console.log('information',information)
    this.overallService.register(information)
    .subscribe(response=>{
      console.log('res',response)
      if(response['message']=="Registration Successfull"){
        if(sessionStorage.getItem('innerRole')){
          alert(response['message'])
          this.router.navigate(['/home'])
        }else{
          alert(response['message'])
          this.router.navigate(['/signin'])
         
        }
      }
     
      else{ alert(response['message'])}

  },error=>{
    this.error=error
  }
)}}

  }

  onConfirmPassword(confirm){
    this.isSame=false;
    this.isInvalid=true
    console.log('password',this.inPassword)
    console.log('con',confirm)
    if(this.inPassword==confirm)
    {
      this.isSame=true
      this.isInvalid=false
    }
    else{
      
      this.checkIfStaring=false
    }
  }

  isNumberKey(evt){
    var charCode = evt.key

    if (!(charCode < 48 || charCode > 57))
        return false;

    return true;
}
}