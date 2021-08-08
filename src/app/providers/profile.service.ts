/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import * as AppConfig from '../../app/serverCalls';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  Address: any;
  profileVariable: string;
  states: any;
  selectedAddress;
  private cfg: any;
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }
setAddress(a){
  this.Address=a;
}

getAddress(){
  return this.Address;
}
setVariable(a){
  this.profileVariable=a;
}

getVariable(){
  return this.profileVariable;
}
setState(a){
  this.states=a;
  console.log('getState',this.states);
}

getState(){
  return this.states;
}
setSelectedAddress(address){
  this.selectedAddress=address;
}
getSelectedAddress(){
  return this.selectedAddress;
}




  getProfile(token,formValue): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ token
      })
    };
    return this.http.post(this.cfg.url+'updateProfle',formValue, httpOptions).pipe(map((response: Response)=>response));
  }
  updateProfile(token,formValue): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ token
      })
    };
    return this.http.post(this.cfg.url+'user',formValue, httpOptions).pipe(map((response: Response)=>response));
  }
}
