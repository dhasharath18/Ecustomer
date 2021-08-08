/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import *  as AppConfig from '../../app/serverCalls';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  cart: Array<any> =[];
  buyNowString: string;
  private cfg: any;
   private loader;
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getItems(sobj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url+'searchItems',sobj, httpOptions).pipe(map((response: any) => response));
    }
  getCategory(): Observable<any> {
    const params=3;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.url+ `havingCategories/${params}`, httpOptions).pipe(map((response: any) => response));
  }
  paymentModes(token): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.get(this.cfg.url+'getpaymentTypes', httpOptions)
      .pipe(map((response: Response) => response));
  }

  getProfile(token): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.get(this.cfg.url+'getUserprofile', httpOptions)
      .pipe(map((response: Response) => response));
  }

  placeOrder(token,form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.post(this.cfg.url+'orderPayment',form, httpOptions)
      .pipe(map((response: Response) => response));
  }

  setCart(Cart){
    this.cart=Cart;
    console.log('serviceCart',this.cart);
  }

  getCart(){
 return this.cart;
  }

  getCartLength(){
    return this.cart.length;
  }

   Total(){
    let total = 0;
    if(this.cart){
      this.cart.forEach(element => {
        total+=element.qty*(element.actual_price-element.discounted_price);

      });
    }
    return total;

  }
setBuyNow(a) {
  this.buyNowString=a;
}
getBuyNow() {
  return this.buyNowString;
}
}



