import { Component, OnInit } from '@angular/core';
import { ItemListService } from '../../providers/item-list.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController ,NavParams} from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  orderProfile: any;
  orderInfo: Array<any> = [];
  trackingData: Array<any> = [];
  constructor(
     private itemListService: ItemListService,
    private navCtrl: NavController,
    private navparams: NavParams,
    private router: Router,
    private modalController: ModalController,
    private storage: Storage,
    private utils: UtilsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.orderProfile=this.navparams.get('details');
    console.log(this.orderProfile);
    if(this.orderProfile){
      this.orderInfo = this.orderProfile.order_data;
      this.trackingData = this.orderProfile.tracking_data;
    }
  }
  remove() {
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss({}).then(() => {
    });
  }

}
