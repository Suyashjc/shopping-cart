import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OverallServeice } from '../overall.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  info: any
  error:any
  role:string
  testArray = [{id:'1',name:'b'}]

  constructor(private overallService: OverallServeice,
                private router: Router,
                private title: Title) { }

  ngOnInit() {
    this.title.setTitle("ShoppingCart")
  }
  
  onSignin(form: NgForm) {
    console.log('val', form.value);
    let phoneNumber = form.value.phoneNo;
    let password = form.value.password
    var info = {
      "phoneNumber": String(phoneNumber),
      "password": password
    }

    this.overallService.login(info)
      .subscribe(response => {
        console.log('resin', response)
        this.info = response

        if (this.info.message) {
          console.log('fail')
          alert('Username or password did not match')
        }
        else {
          sessionStorage.setItem("role", JSON.stringify(this.info.user['userRoles']));
          console.log('pass',this.info.user['userRoles'])
                  
          localStorage.setItem('token', this.info['token'])
          console.log('token', localStorage.getItem('token')) 
         // sessionStorage.setItem('role',this.info.user['role'])
        
          console.log('role', sessionStorage.getItem('role'))          
          // this.overallService.logging()
          this.role= JSON.parse(sessionStorage.getItem("role"));
          console.log(this.role.length,'ssfa')
          this.overallService.emitRole.next(this.role)

          
          this.overallService.innerRole.next('1')
          if(this.info.user['role']=='3'){
            console.log('both')
            sessionStorage.setItem('role','2')
            sessionStorage.setItem('innerRole',this.info.user['role'])
            //this.overallService.emitRole.next('2')
            this.overallService.innerRole.next('3')
          }

          if(this.info.user['role']=='4'){
            console.log('master')
            sessionStorage.setItem('role','2')
            sessionStorage.setItem('innerRole',this.info.user['role'])
           // this.overallService.emitRole.next('2')
            this.overallService.innerRole.next('4')
          }
          this.router.navigate(['/home'])
        }
      }, 
      error=>{
        this.error=error
        console.log('error',error)
      }
    )
  }
}
