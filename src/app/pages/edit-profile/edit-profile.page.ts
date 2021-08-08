import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilsService } from '../../providers/utils.service';
import { ProfileService } from '../../providers/profile.service';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemListService } from 'src/app/providers/item-list.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  updateProfileForm: any;
  myProfile: any;
  newName;
  newEmail;
  newPhone;
  newAddress;
  profileVariable: string;
  vendorId: any;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private itemListService: ItemListService,
    private storage: Storage,
    public utils: UtilsService,
    public profileService: ProfileService
  ) {}

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
      ],
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  ionViewWillEnter() {
    this.getProfile();
  }

  getProfile() {
    this.utils.presentLoading();
    this.storage.get('token').then((token) => {
      this.itemListService.getProfile(token).subscribe((result) => {
        this.utils.dismissLoading();
        if (result.status === 'OK') {
          this.myProfile = result.userdata;
        }
        if (this.myProfile) {
          this.updateProfileForm.controls.email.setValue(this.myProfile.email);
          this.updateProfileForm.controls.name.setValue(this.myProfile.name);
          this.updateProfileForm.controls.phone.setValue(this.myProfile.phone);
        }
      });
    });
  }

  submit() {
    this.utils.presentLoading();
    this.storage.get('token').then((token) => {
      this.profileService
        .updateProfile(token, this.updateProfileForm.value)
        .subscribe((result) => {
          this.utils.dismissLoading();
          if (result.status === 'OK') {
            this.utils.presentAlert('Success!', 'Profile Updated Successfully');
            this.utils.setparam('loader');
            this.navCtrl.navigateBack('/profile');
          } else {
            this.utils.presentAlert('Error!', 'Please enter correct details');
          }
        });
    });
  }
}
