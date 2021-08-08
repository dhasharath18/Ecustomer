import { Component, OnInit } from '@angular/core';
import { ItemListService } from 'src/app/providers/item-list.service';
import { ItemDetailsService } from 'src/app/providers/item-details.service';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { OrdersummaryService } from 'src/app/providers/ordersummary.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.page.html',
  styleUrls: ['./ordersummary.page.scss'],
})
export class OrdersummaryPage implements OnInit {
  buyNowItem: Array<any> = [];
  cartItems: Array<any> = [];
  addressList: Array<any> = [];
  statesList: Array<any> = [];
  productDetails: any;
  buynowString: any;
  totalActualPrice: number;
  totalDiscount: number;
  cart: any;
  lastOrderdAddress;
  headerTitle = { title: 'Order Summary' };
  selectedAddress;
  radioButton = false;
  addressSelect=null;
  public dataObsevable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  constructor(
    private itemDetailsService: ItemDetailsService,
    private ordersummaryService: OrdersummaryService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private itemListService: ItemListService,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('buynowString', this.buynowString);
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedAddress =
          this.router.getCurrentNavigation().extras.state.address;
          console.log('selectedAddress',this.selectedAddress);
      }
    });
    this.getAddressList();
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.cartItems = this.router.getCurrentNavigation().extras.state.user;
        if (!this.selectedAddress) {
          this.ordersummaryService.setCartListItems(this.cartItems);
        }
        if (this.cartItems) {
          this.getTotalPrice();
        }
      }
    });

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.productDetails =
          this.router.getCurrentNavigation().extras.state.buy;
        if (this.productDetails) {
          this.buynowString = this.itemListService.getBuyNow();
          this.buyNowItem.push(this.productDetails);
          if (!this.selectedAddress) {
            this.ordersummaryService.setListItems(this.buyNowItem);
          }
        }
      }
    });
  }

  ionViewWillEnter() {console.log('ionViewWillEnter');
    if (this.selectedAddress) {console.log('selectedAddress',this.selectedAddress);
      this.lastOrderdAddress = this.selectedAddress;
      if (this.selectedAddress) {
        this.addressSelect = this.selectedAddress.id;
        console.log('AddressSelect', this.addressSelect);
      }
      this.cartItems = this.ordersummaryService.getCartListItems();
      this.buyNowItem = this.ordersummaryService.getListItems();
      this.lastOrderdAddress = this.selectedAddress;
      if (this.cartItems) {
        this.getTotalPrice();
      }
    }
    this.getStates();
  }
  getTotalPrice() {
    this.totalActualPrice = 0;
    this.totalDiscount = 0;
    this.cartItems.forEach((item) => {
      this.totalActualPrice += parseInt(item.actual_price, 10);
      this.totalDiscount += parseInt(item.discounted_price, 10);
    });
  }

  getitem(item) {
    const actualPrice = parseInt(item.actual_price, 10);
    const discountedPrice = parseInt(item.discounted_price, 10);
    const tot = actualPrice - discountedPrice;
    return tot;
  }

  getAddressList() {
    this.storage.get('token').then((token) => {
      this.itemListService.getProfile(token).subscribe((result) => {
        if (result.status === 'OK') {
          this.addressList = result.addresses;
          this.lastOrderdAddress = this.selectedAddress
            ? this.selectedAddress
            : result.last_address;
        }
      });
    });
  }

  getStates() {
    this.storage.get('token').then((token) => {
      this.itemDetailsService.GetStates(token).subscribe((result) => {
        if (result) {
          this.statesList = result.existing_states;
        }
      });
    });
  }

  goToAddressList() {
    const navigationExtras: NavigationExtras = {
      state: { lastOrderdAddress: this.lastOrderdAddress },
    };
    this.router.navigate(['/address-list'], navigationExtras);
  }

  checkout() {
    this.ordersummaryService.setFinalAddress(this.addressSelect);
    const navigationExtras: NavigationExtras = {
      state: { user: this.productDetails },
    };
    this.router.navigate(['checkout'], navigationExtras);
  }

  getselectedAddress(e) {console.log('e',e);
    this.addressSelect = e.detail.value;
    console.log('addressSelect', this.addressSelect);
  }
  ionViewWillLeave(){console.log('ionviewwillleave');
    this.buynowString=undefined;
    console.log('buy',this.buynowString);
  }
  goBack() {
    if (this.buynowString===undefined) {
      this.navCtrl.navigateBack('cart');
    } else {
      this.navCtrl.navigateBack('/item-details');
    }
  }
}
