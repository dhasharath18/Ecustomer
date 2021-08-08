import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isUserLoggedIn;
  constructor(private storage: Storage,private authService: AuthService) {


   }
   getvalue(){
    this.authService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
   }




}
