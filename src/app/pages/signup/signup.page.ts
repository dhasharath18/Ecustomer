import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../providers/auth.service';
import { UtilsService } from '../../providers/utils.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  stateList: Array<any>=[];
  registerForm: FormGroup;
  vendorid: any;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private utils: UtilsService,
    private storage: Storage,
    public navCtrl: NavController) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.compose(
        [Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
         Validators.required]],
      phone: ['', Validators.required],
      acceptTerms:[false,Validators.required]
    });
  }

  ngOnInit() {
   this.vendorid=this.authService.getVendorId();
  }



  submitRegisterForm() {
    this.utils.presentLoading();
    const type = 6;
   this.registerForm.value.type = type;
   this.registerForm.value.vid=this.vendorid;
    return this.authService.vendorRegister(this.registerForm.value).subscribe((result) => {
      this.utils.dismissLoading();
      if (result.status ==='OK') {
        this.navCtrl.navigateBack('/login');
        this.utils.presentAlert('Success!', result.msg);
        this.registerForm.reset();
      } else {
        this.utils.presentAlert('Oops!', result.error);

      }
    });
  }

}
