import { Component, OnInit, ChangeDetectorRef,Input } from '@angular/core';
import { ProfileService } from '../../providers/profile.service';
import { UtilsService } from '../../providers/utils.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ItemDetailsService } from 'src/app/providers/item-details.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemListService } from 'src/app/providers/item-list.service';
import {NavController,NavParams} from '@ionic/angular';
@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.page.html',
  styleUrls: ['./addaddress.page.scss'],
})
export class AddaddressPage implements OnInit {
  @Input() addresses: Array<any>;
  myProfileForm: FormGroup;
  states: Array<any> = [];
  addressArray: Array<any> = [];
  myProfileData: any;
  data: Array<any> = [];

  constructor(
    private profileService: ProfileService,
    private navparams: NavParams,
    private navCtrl: NavController,
    private ref: ChangeDetectorRef,
    private modalController: ModalController,
    private itemDetailsService: ItemDetailsService,
    private itemListService: ItemListService,
    private utils: UtilsService,
    private storage: Storage,
    private fb: FormBuilder,
  ) { this.data=this.navparams.get('Addresses');
}

  ngOnInit() {
    this.myProfileForm = this.fb.group({
      address: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.getStates();
    this.getMyProfile();
  }

  getMyProfile() {
    this.storage.get('token').then((token) => {
      this.itemListService.getProfile(token).subscribe(result => {
        if (result.status === 'OK') {
          this.addressArray = result.addresses;
        }
      });
    });
  }

  getStates() {
    this.storage.get('token').then((token) => {
      this.itemDetailsService.GetStates(token).subscribe((result) => {
        if (result) {
          this.states = result.existing_states;
        }
      });
    });
  }


  remove() {
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      address:this.myProfileData
    }).then(() => {
      this.myProfileForm.reset();
      this.data.push(this.myProfileData);
    });
  }

  submitForm() {
    this.utils.presentLoading();
    this.storage.get('token').then((token) => {
      this.itemDetailsService.subAddress(token, this.myProfileForm.value).subscribe((result) => {
        this.utils.dismissLoading();
        if (result.status === 'OK') {
          this.myProfileData = result.data;
          this.utils.presentAlert('Success!', 'Address added Successfully');
          this.dismiss();
        } else {
          this.utils.presentAlert('Error!', result.error);
        }
      });
    });
  }
}
