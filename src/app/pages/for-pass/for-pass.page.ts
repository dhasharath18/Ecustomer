import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../providers/auth.service';
import {UtilsService} from '../../providers/utils.service';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-for-pass',
  templateUrl: './for-pass.page.html',
  styleUrls: ['./for-pass.page.scss'],
})
export class ForPassPage implements OnInit {

  email;
forgotPasswordForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utils: UtilsService,
    private storage: Storage,
    public navCtrl: NavController
 ) {  this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.compose
          ([Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
          Validators.required]],
      });
    }

  ngOnInit() {
  }

  submitforgotForm() {
    this.authService.forgotpassword( this.forgotPasswordForm.value).subscribe((result) => {
        if(result.status==='OK'){
          this.forgotPasswordForm.reset();
          this.utils.presentAlert('Alert',result.msg);
         this.navCtrl.navigateBack('/login');
        }else{
          this.utils.presentAlert('Error!',result.error);
        }
      });
  }

goBack(){
  this.navCtrl.navigateBack('/login');
}


}
