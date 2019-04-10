import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Route, Router } from "@angular/router";
import { LoaderService } from "./loader.service";
// import{ ErrorObservable} from "rxjs/observable/ErrorObservable"

@Injectable()
export class OverallServeice {
  headers: any
  options
  product: any
  token: any
  role
  mainRole = []
  baseURL = "http://192.168.1.18:8080/ShoppingCart"
  emitRole = new Subject<any>()
  innerRole = new Subject<string>()
  allProductsOfCategory: Subject<any> = new Subject<any>()
  private loginVar: Subject<boolean> = new Subject<boolean>()

  constructor(private http: HttpClient,
    private loader: LoaderService,
    private router: Router) {

  }

  getRole() {
    // this.role=JSON.parse(sessionStorage.getItem("role"));
    // this.mainRole=[]
    // if(this.role){
    //     for(let i=0;i<this.role.length;i++){
    //       this.mainRole.push(this.role[i].roleId)
    //     }}

    // if(this.mainRole.includes(2)){
    //     this.baseURL="http://192.168.1.18:8080/ShoppingCart/admin"
    // }
    // else{
    //     this.baseURL="http://192.168.1.18:8080/ShoppingCart"
    // }

  }


  generalHeader() {
    // console.log(this.token)
    this.headers = new HttpHeaders().set("Content-Type", "application/json")
      .set("Token", "Bearer " + localStorage.getItem('token'))
  }

  updateHeader() {
    console.log(this.token)
    this.headers = new HttpHeaders()
      .set("Token", "Bearer " + localStorage.getItem('token'))
  }

  loginHeader() {

    this.headers = new HttpHeaders().set("Content-Type", "application/json");

  }


  login(credentials) {
    this.getRole()
    this.baseURL = "http://192.168.1.18:8080/ShoppingCart"
    //  this.emitRole.next(JSON.parse(this.role))
    console.log('cre', credentials)
    this.loginHeader()
    // console.log('info',info)
    return this.http.post(this.baseURL + '/signin', credentials, { headers: this.headers })
      .pipe(map(response => {
        return response
      },
        catchError(e => { return e })
      ),
      )
  }

  register(personDetails) {
    this.loginHeader()
    this.baseURL = "http://192.168.1.18:8080/ShoppingCart"
    return this.http.post(this.baseURL + '/register', personDetails, { headers: this.headers })
      .pipe(map(response => {
        return response
      },
        catchError(e => { return e })
      ))
  }


  getHome(): Observable<any> {
    this.generalHeader()
    this.getRole()
    console.log(this.headers)
    return this.http.get(this.baseURL + '/home', { headers: this.headers })
      .pipe(map(response => {
        console.log("home", response)
        return response
      },
        catchError(e => { return e })
      ));
  }

  getCategories(): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.get(this.baseURL + '/allCategories', { headers: this.headers })
      .pipe(map(response => {
        console.log("cat", response)
        return response;
      },
        catchError(e => { return e }))
      )

  }

  getCategoryById(id): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.get(this.baseURL + '/admin/getCategoryById/' + id, { headers: this.headers })
      .pipe(map(response => {
        console.log("cat", response)
        return response;
      },
        catchError(e => { return e }))
      )
  }

  updateCategory(data): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.post(this.baseURL + '/admin/updateCategory', data, { headers: this.headers })
      .pipe(map(response => {
        console.log("cat", response)
        return response;
      },
        catchError(e => { return e }))
      )
  }

  addNewCategory(data): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.post(this.baseURL + '/admin/addNewCategory', data, { headers: this.headers })
      .pipe(map(response => {
        console.log("cat", response)
        return response;
      },
        catchError(e => { return e }))
      )
  }

  deleteCategory(id) {
    this.generalHeader()
    this.getRole()
    return this.http.delete(this.baseURL + '/admin/deleteCategory/' + id, { headers: this.headers })
      .pipe(map(response => {
        console.log("cat", response)
        return response;
      },
        catchError(e => { return e }))
      )
  }

  logging() {
    this.loginVar.next(true)
  }
  logingOut() {
    this.loginVar.next(false)
  }

  isLoggedIn(): Observable<any> {
    return this.loginVar.asObservable()
  }

  getProductsByCategory(id, pg): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.get(this.baseURL + '/getProductsByCategory/' + id + '?pageNumber=' + pg, { headers: this.headers })
      .pipe(map(response => {
        console.log('prodAll', response)
        return response;

      },
        catchError(e => { return e })
      ))
  }

  getProductCount(id): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.get(this.baseURL + '/getProductCount/' + id, { headers: this.headers })
      .pipe(map(response => {
        console.log('count', response)
        return response;

      },
        catchError(e => { return e })
      ))
  }

  getProductById(id): Observable<any> {
    this.generalHeader()
    this.getRole()
    console.log(id)
    return this.http.get(this.baseURL + '/getProductById/' + id, { headers: this.headers })
      .pipe(map(response => {
        console.log('ipProd', response)
        return response
      },
        catchError(e => { return e })
      ))
  }

  updateProduct(id, data): Observable<any> {
    this.generalHeader()
    this.getRole()
    console.log(id)
    return this.http.post(this.baseURL + '/admin/updateProduct', data, { headers: this.headers })
      .pipe(map(response => {
        console.log('ipProd', response)
        return response
      },
        catchError(e => { return e })
      ))
  }

  deleteProduct(id) {
    this.generalHeader()
    this.getRole()
    return this.http.delete(this.baseURL + '/admin/deleteProduct/' + id, { headers: this.headers })
      .pipe(map(response => {
        console.log('ipProd', response)
        return response
      },
        catchError(e => { return e }))
      )
  }

  updateProductImage(data) {
    this.updateHeader()
    this.getRole()
    return this.http.post(this.baseURL + '/admin/updateProductImage', data, { headers: this.headers })
      .pipe(map(response => {
        console.log('response', response)
        return response
      },
        catchError(e => {
          console.log('ee', e)
          return e
        })))
  }

  addNewProduct(data) {
    this.updateHeader()
    this.getRole()
    return this.http.post(this.baseURL + '/admin/addNewProduct', data, { headers: this.headers })
      .pipe(map(response => {
        console.log('response', response)
        return response
      },
        catchError(e => {
          console.log('ee', e)
          return e
        })))
  }


  addProductToWishlist(id): Observable<any> {
    this.generalHeader()
    this.getRole()
    console.log('caled', id)
    return this.http.get(this.baseURL + '/user/addProductToWishlist/' + id, { headers: this.headers })
      .pipe(map(response => {
        return response
      },
        catchError(e => { return e })
      ))
  }

  deleteProductFromWishlist(id): Observable<any> {
    this.generalHeader()
    this.getRole()
    console.log(id)
    return this.http.get(this.baseURL + '/user/deleteProductFromWishlist/' + id, { headers: this.headers })
      .pipe(map(response => {
        return response
      },
        catchError(e => { return e })))
  }


  getUserWishlist(): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.get(this.baseURL + '/user/getUserWishlist', { headers: this.headers })
      .pipe(map(response => {
        return response
      },
        catchError(e => { return e })
      ))
  }

  getUserDetails(): Observable<any> {
    this.generalHeader()
    this.getRole()
    return this.http.get(this.baseURL + '/userDetails', { headers: this.headers })
      .pipe(map(response => {
        console.log('det', response)
        return response
      },
        catchError(e => {
          console.log('ee', e)
          return e
        })))
  }

  editUser(info) {
    console.log('info', info)
    this.generalHeader()
    this.getRole()
    return this.http.post(this.baseURL + '/editUser', info, { headers: this.headers })
      .pipe(map(response => {
        console.log('response', response)
        return response
      },
        catchError(e => {
          console.log('ee', e)
          return e
        })))

  }

  onUpload(data) {
    this.updateHeader()
    this.getRole()
    console.log('data', data)
    return this.http.post(this.baseURL + '/imageUpload', data, { headers: this.headers })
      .pipe(map(response => {
        console.log('response', response)
        return response
      },
        catchError(e => {
          console.log('ee', e)
          return e
        })))
  }

}
