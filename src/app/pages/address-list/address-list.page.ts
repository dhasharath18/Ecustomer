import { Component, OnInit } from '@angular/core';
import { ItemListService } from '../../providers/item-list.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ProfileService } from 'src/app/providers/profile.service';
import {AddaddressPage} from '../../modals/addaddress/addaddress.page';
@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.page.html',
  styleUrls: ['./address-list.page.scss'],
})
export class AddressListPage implements OnInit {

  addressList: Array<any> = [];
  recentAddress;
  selectedAddress;
  selectedAddressList;
  constructor(
    private itemListService: ItemListService,
    private profileService: ProfileService,
    private navCtrl: NavController,
    private router: Router,
    private modalController: ModalController,
    private storage: Storage,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.recentAddress =this.router.getCurrentNavigation().extras.state.lastOrderdAddress;
        console.log(this.recentAddress);
      }
    });
    this.getAddressList();
  }
 ionViewWillEnter() {
 this.getCheckedValues();
 }
  editAddress(address) {
    this.profileService.setAddress(address);
    this.navCtrl.navigateForward('/edit-address');
  }
  getselectedAddress(e){
    this.selectedAddress=e.detail.value;
    console.log(this.selectedAddress);
     this.profileService.setSelectedAddress(this.selectedAddress);
  }

  getAddressList() {
    this.storage.get('token').then((token) => {
      this.itemListService.getProfile(token).subscribe(result => {
        if (result.status === 'OK') {
          this.addressList = result.addresses;
          // this.recentAddress=result.last_address;
        }
      });
    });
  }

  getCheckedValues(){
    this.addressList.forEach((item) =>{
      if (this.recentAddress){
        if(this.recentAddress.id===item.id){
          item.isChecked=true;
        }
      }
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddaddressPage,
      cssClass: 'my-custom-class',
      componentProps: { address: this.addressList },
    });
    modal.onDidDismiss()
      .then(() => {
        this.getAddressList();
      });
    return await modal.present();
  }
  editrecentAddress(){
    this.navCtrl.navigateForward('/edit-address');
  }
  orderSummary(){
    if(!this.selectedAddress){
     this. selectedAddressList=this.recentAddress;
        }else{
          this.addressList.forEach((address) => {
            if(this.selectedAddress===address.id){
            this.selectedAddressList=address;
        }
      });
    }
    console.log(this.selectedAddressList);
    const navigationExtras: NavigationExtras = {
      state: { address: this.selectedAddressList }
    };
    this.router.navigate(['ordersummary'], navigationExtras);
  }
}
