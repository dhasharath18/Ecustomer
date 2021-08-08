import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ItemListService } from '../../providers/item-list.service';
import { ItemDetailsService } from '../../providers/item-details.service';
import { ProfileService } from '../../providers/profile.service';
import { UtilsService } from '../../providers/utils.service';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AddaddressPage } from '../../modals/addaddress/addaddress.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  myProfile: any;
  myProfileForm: FormGroup;
  headerTitle = { title: 'My Account', cart: 0 };
  openForm = false;
  states: Array<any> = [];
  statValue = '3';
  myProfileData;
  loader: any;
  profile: any;
  addressArray: Array<any> = [];
  constructor(private utils: UtilsService,
    private itemDetailsService: ItemDetailsService,
    private profileService: ProfileService,
    private modalController: ModalController,
    private storage: Storage,
    private fb: FormBuilder,
    private router: Router,
    public navCtrl: NavController,
    private itemListService: ItemListService) { }

  ngOnInit() {
    this.getStates();
    this.myProfileForm = this.fb.group({
      address: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.minLength(6), Validators.required]],
    });
  }
  ionViewWillEnter() {
    this.loader = this.utils.getLoader();
    this.profile = this.utils.getProfileParameter();
    this.setCartCount();
    this.getMyProfile();
    this.getAddressList();
  }

  setCartCount() {
    this.headerTitle.cart = this.itemListService.getCartLength();
  }



  getAddressList() {
    console.log('getAddressList');
    this.storage.get('token').then((token) => {
      this.itemListService.getProfile(token).subscribe(result => {
        console.log(result);
        if (result.status === 'OK') {
          this.addressArray = result.addresses;
          console.log('AddressArray', this.addressArray);
        }
      });
    });
  }

  async presentModal() {
    console.log(this.addressArray);
    const modal = await this.modalController.create({
      component: AddaddressPage,
      cssClass: 'my-custom-class',
      componentProps: { addresses: this.addressArray },
    });
    modal.onDidDismiss()
      .then(() => {
        this.getAddressList();
      });
    return await modal.present();
  }

  getMyProfile() {
    if (!this.loader) { this.utils.presentLoading(); }
    this.storage.get('token').then((token) => {
      this.itemListService.getProfile(token).subscribe(result => {
        if (!this.loader) { this.utils.dismissLoading(); }
        if (result.status === 'OK') {
          this.myProfile = result.userdata;
          this.addressArray = result.addresses;
        }
      });
    });
  }


  editProfile() {
    const navigationExtras: NavigationExtras = {
      state: { user: this.myProfile }
    };
    this.router.navigate(['/edit-profile'], navigationExtras);

  }

  getStates() {
    this.storage.get('token').then((token) => {
      this.itemDetailsService.GetStates(token).subscribe((result) => {
        if (result) {
          this.states = result.existing_states;
          this.setState(result.existing_states);
        }
      });
    });
  }

  setState(state) {
    this.profileService.setState(state);
  }

  editAddress(address) {
    this.profileService.setVariable('address');
    this.profileService.setAddress(address);
    this.navCtrl.navigateForward('/edit-address');
  }

  deleteAddress(address) {
    this.storage.get('token').then((token) => {
      const dobj = {
        id: address.id,
        cat: 'address',
      };
      this.itemDetailsService.deleteAddress(token, dobj).subscribe((result) => {
        this.utils.dismissLoading();
        if (result.status === 'OK') {
          this.addressArray.forEach((element, index) => {
            if (element.id === address.id) {
              this.addressArray.splice(index, 1);
            }
          });
          this.utils.presentAlert('Success!', 'Deleted Successfully');
        } else {
          this.utils.presentAlert('Error!', result.error);
        }
      });
    });
  }




}
