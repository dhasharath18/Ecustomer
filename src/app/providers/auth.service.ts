/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import *  as AppConfig from '../../app/serverCalls';
import { map } from 'rxjs/operators';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  vendorId;
  private cfg: any;

  constructor(public http: HttpClient,
    public storage: Storage) {
    this.cfg = AppConfig.cfg;
  }
  loginUser(loginForm): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url+'loginForm', loginForm, httpOptions)
      .pipe(map((response: Response) => response));
  }

  vendorRegister(form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.url+'register', form, httpOptions)
      .pipe(map((response: Response) => response));
  }
  statesList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.url+'getStates', httpOptions)
      .pipe(map((response: Response) => response));
  }
  forgotpassword(pobj): Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(this.cfg.url+'forgotPassword',pobj, httpOptions)
    .pipe(map((response: Response) => response));
  }
  changePassword(token,pobj): Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.post(this.cfg.url+'changePassword',pobj, httpOptions)
    .pipe(map((response: Response) => response));
  }
  setVendorId(vendorId){
    this.vendorId = vendorId;
    console.log('VendorId',vendorId);
  }
  getVendorId(){
    return this.vendorId;
  }
}
