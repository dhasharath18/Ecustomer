/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import *  as AppConfig from '../../app/serverCalls';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  private cfg: any;

  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }
  GetStates(token): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.get(this.cfg.url+'states', httpOptions)
      .pipe(map((response: Response) => response));
  }
  subAddress(token,form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.post(this.cfg.url+'addressForm', form,httpOptions)
      .pipe(map((response: Response) => response));
  }
  deleteAddress(token,form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.post(this.cfg.url+'delete', form,httpOptions)
      .pipe(map((response: Response) => response));
  }
}




