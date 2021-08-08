import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../providers/auth.service';
import {UtilsService} from '../../providers/utils.service';
import {Storage} from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import {AppComponent} from '../../app.component';
import {ItemListService} from '../../providers/item-list.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  headerTitle={title:'Login'};
  cartItems: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private itemListService: ItemListService,
    private utils: UtilsService,
    private appComponent: AppComponent,
    private storage: Storage,
    public navCtrl: NavController) {
      this.storage.get('token').then((token) => {
       if(token){
         this.navCtrl.navigateForward('/item-list');
       }
      });
  }

  ngOnInit() {
    this.loginForm =this.fb.group({
      email: ['', [Validators.compose(
        [Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
        Validators.required]],
      password: ['', Validators.required]
    });
  }
  ionViewWillEnter() {
    this.cartItems=this.itemListService.getCart();
  }

  submitLoginForm() {
    this.utils.presentLoading();
    this.authService.loginUser(this.loginForm.value).subscribe((result) => {
    this.utils.dismissLoading();
      if (result) {
        if (result.status === 'OK') {
          this.loginForm.reset();
            this.storage.set('token', result.token).then(() => {
                if(result) {
                  this.appComponent.logout();
                  if(this.cartItems){
                    this.navCtrl.navigateForward('/cart');
                  }else{
                    this.navCtrl.navigateForward('/item-list');
                  }

                }
              });
        } else {
          this.utils.presentAlert('Oops', result.error);
        }
      }
    });
  }

forgotPass(){
  this.navCtrl.navigateForward('/for-pass');
}

register(){
  this.navCtrl.navigateForward('/signup');
}

}
