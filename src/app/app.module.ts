import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule,
   MatButtonModule,
    MatSidenavModule,
     MatIconModule,
      MatListModule,
      MatCardModule, 
      MatTooltipModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AccountComponent } from './account/account.component';
import { OverallServeice } from './overall.service';
import { HttpClientModule } from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader-interceptor.service';
import { LoaderService } from './loader.service';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';


@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    MyNavComponent,
    SigninComponent,
    ProductsComponent,
    RegisterComponent,
    HomeComponent,
    WishlistComponent,
    ProductDetailsComponent,
    AccountComponent,
    EditProductComponent,
    NewProductComponent,
    EditCategoryComponent,

    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    MatTooltipModule,
    PaginationModule.forRoot(),
    NgbModule.forRoot(),
  ],
  providers: [OverallServeice,
    LoaderService,
     {provide: LocationStrategy, useClass: HashLocationStrategy},
     {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
