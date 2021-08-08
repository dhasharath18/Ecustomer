/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import *  as AppConfig from '../../app/serverCalls';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MyordersService {
  private cfg: any;
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  getOrders(token,sobj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+token
      })
    };
    return this.http.post(this.cfg.url+'getOrders',sobj, httpOptions)
      .pipe(map((response: Response) => response));
  }
}
