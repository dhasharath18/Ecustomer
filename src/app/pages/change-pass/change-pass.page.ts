import { Component, OnInit } from '@angular/core';
import { Validators,FormControl, FormBuilder, FormGroup, AbstractControl,ValidationErrors } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { UtilsService } from '../../providers/utils.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {

  public pswdForm: FormGroup;
  headerTitle = { title: 'Change Password' };
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public utils: UtilsService,
    public toastCtrl: ToastController
  ) {
    this.pswdForm=this.fb.group({
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      cnfpassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(4)
      ])
    },
    {
      validators: ChangePassPage.confirmed('password', 'cnfpassword')
    });
  }
  static confirmed = (controlName: string, matchingControlName: string) => (control: AbstractControl): ValidationErrors | null => {
        const input = control.get(controlName);
        const matchingInput = control.get(matchingControlName);

        if (input === null || matchingInput === null) {
            return null;
        }

        if (matchingInput?.errors && !matchingInput.errors.confirmedValidator) {
            return null;
        }

        if (input.value !== matchingInput.value) {
            matchingInput.setErrors({ confirmedValidator: true });
            return ({ confirmedValidator: true });
        } else {
            matchingInput.setErrors(null);
            return null;
        }
    };

  ngOnInit() { }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Password Updated Suceesfully',
      position: 'bottom'
    });
    toast.present();
  }

  submitPassword() {
    this.utils.presentLoading();
    this.pswdForm.value.user='customer';
    this.storage.get('token').then((token) => {
        this.authService.changePassword(token, this.pswdForm.value).subscribe((result) => {
          this.utils.dismissLoading();
          if (result.status === 'OK') {
            this.pswdForm.reset();
            setTimeout(() => {
              this.navCtrl.navigateForward('/settings');
            },200);
            this.presentToast();
          } else if (result.error) {
            this.pswdForm.reset();
            this.utils.presentAlert('Oops!', result.error,'error');
          }
        });
    });
  }
  ionViewWillLeave(){
    this.pswdForm.reset();
  }
}
