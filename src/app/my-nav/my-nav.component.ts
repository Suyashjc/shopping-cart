import { Component, OnInit, ChangeDetectorRef, ViewChild, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OverallServeice } from '../overall.service';
import { ProductsComponent } from '../products/products.component';


@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css'],
})
export class MyNavComponent implements OnInit{
  
displayCategory=false;
categories;
valid:Observable<boolean>;
role=JSON.parse(sessionStorage.getItem("role"));
mainRole=[];
error;
innerRole=sessionStorage.getItem('innerRole');

ngOnInit(){
 // this.valid=this.overallService.isAuthenticate()
  console.log(this.valid)
 // this.overallService.isLoggedIn().subscribe(message=>{this.valid=message});
  
  }

  constructor(
    public router:Router,
    private overallService:OverallServeice,
    private cdRef : ChangeDetectorRef) {

      if(this.role){
        for(let i=0;i<this.role.length;i++){
          this.mainRole.push(this.role[i].roleId)
        }}

    this.overallService.emitRole.subscribe(getRole=>{
      this.role=getRole     
      if(this.role){
      for(let i=0;i<this.role.length;i++){
        this.mainRole.push(this.role[i].roleId)
      }}
      console.log('mainRoler',this.mainRole)
      // this.cdRef.detectChanges();
    }
    )

    this.overallService.innerRole.subscribe(
      innerRole=>{this.innerRole=innerRole}
    )  
    }

    logout(){
    this.overallService.logingOut()
      localStorage.clear()
      sessionStorage.clear()
      this.router.navigate(['/signin'])
      this.mainRole=[]
    }


    selectCategory(cateogryId,drawer){
      localStorage.setItem('pageNumber',"1")
      console.log('menupg',localStorage.getItem('pageNumber'))
      drawer.toggle();
      console.log('impId',cateogryId)         
      this.router.navigate(['/products/'+cateogryId])
}
      
   openSide(drawer){
    this.overallService.getCategories()
    .subscribe(response=>{this.categories=response
    },error=>{this.error=error}
    )
    drawer.toggle()
   }
   
   editCategory(drawer){
     this.router.navigate(['/editCategory'])
     drawer.toggle()
   }

showCategory(){
  
  this.displayCategory=!this.displayCategory
    }

    tokenPresent(event){
      console.log(event,'token')
    }

}

