import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { ProductsComponent } from "./products/products.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { AccountComponent } from "./account/account.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: "full" },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products/:id', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'editProduct/:id', component: EditProductComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'account', component: AccountComponent },
  { path: 'newProduct', component: NewProductComponent },
  { path: 'editCategory', component: EditCategoryComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
