import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { UtilsService } from '../../providers/utils.service';
import { ItemListService } from '../../providers/item-list.service';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersummaryService } from 'src/app/providers/ordersummary.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkOutForm: FormGroup;
  paymentModes: Array<any> = [];
  addressArray: Array<any> = [];
  cartItems: Array<any> = [];
  cartArray: Array<any> = [];
  itemDetails: any;
  price: any;
  buyNowArray: any;
  address: any;
  selectedAddress: any;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private ordersummaryService: OrdersummaryService,
    private utils: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private itemlistService: ItemListService,
    private storage: Storage
  ) {
    this.gePaymentModes();
  }

  ngOnInit() {
    this.checkOutForm = this.fb.group({
      pay: ['', Validators.required],
    });

    this.cartItems = this.itemlistService.getCart();
    this.selectedAddress=this.ordersummaryService.getFinalAddress();
    this.itemDetails = this.ordersummaryService.getListItems();
    if (this.itemDetails) {
      this.itemDetails.forEach((item) => {
        this.price =
           // eslint-disable-next-line radix
          parseInt(item.actual_price) - parseInt(item.discounted_price);
      });
      this.itemlistService.Total().toFixed(2);
      this.itemDetails.forEach((item) => {
        item.qty = '1';
      });
    }
  }

  getTotal() {
    return this.itemlistService.Total().toFixed(2);
  }

  ionViewWillEnter() {
    this.getCartId();
  }

  getCartId() {
    this.cartArray = [];
    if (this.cartItems) {
      this.cartArray = this.cartItems.map((item) => ({
        id: item.id,
        qty: item.qty,
      }));
    }
  }

  gePaymentModes() {
    this.utils.presentLoading();
    this.storage.get('token').then((token) => {
      this.itemlistService.paymentModes(token).subscribe((result) => {
        this.utils.dismissLoading();
        if (result) {
          this.paymentModes = result;
        }
      });
    });
  }

  onSubmit() {
    this.checkOutForm.value.ids =
      this.cartArray.length === 0 ? this.itemDetails : this.cartArray;
    this.checkOutForm.value.address = this.selectedAddress;
    this.utils.presentLoading();
    this.storage.get('token').then((token) => {
      this.itemlistService
        .placeOrder(token, this.checkOutForm.value)
        .subscribe((result) => {
          this.utils.dismissLoading();
          if (result.status === 'OK') {
            this.cartItems.splice(0, this.cartItems.length);
            this.itemlistService.setCart(this.cartItems);
            this.utils.presentAlert(
              'Success!',
              'Your order delivers as soon as possible'
            );
            this.navCtrl.navigateForward('/my-orders');
            this.utils.setparam('loader');
          } else {
            this.utils.presentAlert('Error!', result.error, 'error');
          }
        });
    });
  }
}
