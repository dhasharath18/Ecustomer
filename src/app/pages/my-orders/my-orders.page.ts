/* eslint-disable radix */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemListService } from '../../providers/item-list.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MyordersService } from 'src/app/providers/myorders.service';
import { NavController, IonInput, ModalController } from '@ionic/angular';
import {OrderDetailsPage} from 'src/app/modals/order-details/order-details.page';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  @ViewChild('searchInput', { static: false }) inputElement: IonInput;
  headerTitle = { title: 'My Orders', cart: 0 };
  page = 1;
  orderList: Array<any> = [];
  cart: any;
  cartItemCount: any;
  itemName: any;
  totalItems: any;
  text: string;
  ordersInfo: Array<any> = [];
  firstOrder;

  constructor(private itemListService: ItemListService,
    private navCtrl: NavController,
    private orderService: MyordersService,
    private modalController: ModalController,
    private router: Router,
    private storage: Storage,
    private utils: UtilsService) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
   this.onPageLoad();
  }
  onPageLoad(){
    this.page=1;
    this.getOrders();
  }

  async presentModal(order) {
    const modal = await this.modalController.create({
      component: OrderDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: { details: order },
    });
    modal.onDidDismiss()
      .then(() => {
      });
    return await modal.present();
  }

  getOrders(optNum?: number) {
    if (optNum !== 1) { this.utils.presentLoading(); }
    this.storage.get('token').then((token) => {
      const sobj = {
        page: this.page,
        limit: 10,
      };
      this.orderService.getOrders(token, sobj).subscribe(result => {
        this.page=this.page+1;
        if (optNum !== 1) { this.utils.dismissLoading(); }
        if (result.data == null) {
          this.text = 'No Data Found.';
          this.totalItems = 0;
          this.orderList = [];
        } else {
          if (optNum === 1) {
            this.orderList = this.orderList.concat(result.data);
            this.totalItems = result.total;
          } else {
            this.orderList = result.data;
            this.totalItems = result.total;
          }

        }
      });
    });

  }

  loadData(event) {
    setTimeout(() => {
      if (this.orderList.length ===parseInt(this.totalItems)) {
        event.target.complete();
      } else {
        this.getOrders(1);
      }
      event.target.complete();
    }, 500);
  }
  doRefresh(event) {
    setTimeout(() => {
     this.onPageLoad();
      event.target.complete();
    }, 2000);
  }

  itemClick(item: any) {
    const navigationExtras: NavigationExtras = {
      state: { user: item }
    };
    this.router.navigate(['my-order-details'], navigationExtras);
  }

}
