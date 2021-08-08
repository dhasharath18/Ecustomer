import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ItemListService } from '../../providers/item-list.service';
import { ItemDetailsService } from '../../providers/item-details.service';
import { ProfileService } from '../../providers/profile.service';
import { UtilsService } from '../../providers/utils.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {
  addressDetails: any;
  updateAddressForm: FormGroup;
  profileVariable: string;
  newPincode: any;
  newAddress: any;
  newState: any;
  newName: any;
  newPhone: any;
  compareWith: any;
  compareWithFn;
  states;
  vendorId;
  constructor(private utils: UtilsService,
    private itemDetailsService: ItemDetailsService,
    private profileService: ProfileService,
    private authService: AuthService,
    private storage: Storage,
    private fb: FormBuilder,
    private router: Router,
    public navCtrl: NavController,
    private itemListService: ItemListService) { }

  ngOnInit() {
    this.addressDetails = this.profileService.getAddress();
    this.states = this.profileService.getState();
    this.updateAddressForm = this.fb.group({
      pincode: ['', Validators.compose([Validators.minLength(6),Validators.required])],
      address: ['', Validators.required],
      state: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });

    if (this.addressDetails && this.states) {
      this.setAddressDetails();
      this.compareWith = this.compareWithFn;
    }
  }

  setAddressDetails() {
    if (this.addressDetails) {
      this.newPincode = this.addressDetails.pincode;
      this.newAddress = this.addressDetails.address;
      this.newState = this.addressDetails.state_id;
      this.newName = this.addressDetails.customer_name;
      this.newPhone = this.addressDetails.phone;
    }
    if (this.addressDetails) {
      this.updateAddressForm.setValue({
        pincode: this.addressDetails.pincode,
        address: this.addressDetails.address,
        state: this.addressDetails.id,
        name: this.addressDetails.customer_name,
        phone: this.addressDetails.phone,
      });
    }
  }
  ionViewWillEnter() {
    this.vendorId = this.authService.getVendorId();
    this.profileVariable=this.profileService.getVariable();
    console.log(this.profileVariable);
  }
  submitForm() {
    this.utils.presentLoading();
    this.storage.get('token').then((token) => {
      this.updateAddressForm.value.vid = this.vendorId;
      this.updateAddressForm.value.id = this.addressDetails.id;
      this.itemDetailsService.subAddress(token, this.updateAddressForm.value).subscribe((result) => {
        this.utils.dismissLoading();
        if (result.status === 'OK') {
          this.utils.presentAlert('Success!', 'Address updated Successfully');
          if(this.profileVariable){console.log('profile');
          this.navCtrl.navigateBack('/profile');
        }else{console.log('address-list');
          this.navCtrl.navigateBack('/address-list');
        }
          this.utils.setparam('loader');
        } else {
          this.utils.presentAlert('Error!', result.error);
        }
      });
    });
  }
}
