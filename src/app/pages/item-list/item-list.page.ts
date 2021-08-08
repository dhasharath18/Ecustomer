/* eslint-disable radix */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemListService } from '../../providers/item-list.service';
import { ItemDetailsService } from '../../providers/item-details.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { AuthService } from '../../providers/auth.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { IonInput } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ProfileService } from 'src/app/providers/profile.service';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  @ViewChild('searchInput', { static: false }) inputElement: IonInput;
  headerTitle = { title: 'Home', cart: 0 };
  page = 1;
  itemList: Array<any> = [];
  cart: any;
  cartItemCount: any;
  itemName: any;
  totalItems: any;
  text: string;
  totalItemList: Array<any> = [];
  vendorId: any;
  loader: any;
  backButtonSubscription: any;
  categoryId: string;
  categories;
  sobj;
  catSlideOpts = {
    slidesPerView: 3,
    // spaceBetween: 8,
    // freeMode: true
  };

  constructor(
    private itemListService: ItemListService,
    private itemDetailsService: ItemDetailsService,
    private profileService: ProfileService,
    private authService: AuthService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private utils: UtilsService) {}

  ngOnInit() {
    this.vendorId = this.authService.getVendorId();
    this.getCategory();
  }

  ionViewWillEnter() {
    this.loader = this.utils.getLoader();
  this.onPageLoad();
    this.setCartCount();
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      navigator['app'].exitApp();
    });
  }

onPageLoad(){
  this.page=1;
  this.getItemList();
}

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  getCategory(){
    this.itemListService.getCategory().subscribe((result) => {
      if(result){
        this.categories=result;
      }
    });
  }

  getProducts(h){
    this.categoryId=h.id;
    if(this.categoryId){
      this.getItemList();
    }
  }
  getitem(item) {
    // eslint-disable-next-line radix
    const actualPrice=parseInt(item.actual_price);
    const discountedPrice=parseInt(item.discounted_price);
    const tot = (actualPrice - discountedPrice) ;
   return tot;
  }

  getItemName(e) {
    this.itemName = e.detail.value;
    if (this.itemName.length > 3 || this.itemName.length === 0) {
      this.getItemList(2);
    }
  }

  setCartCount() {
    this.headerTitle.cart = this.itemListService.getCartLength();
  }
  getItemList(optNum?: number): any {
  if(optNum !== 1){this.utils.presentLoading();}
   if(optNum ===3){
    this. sobj = {
      page: this.page,
      limit: 10,
      vid: this.vendorId,
      name: this.itemName ? this.itemName : ''
    };
   } else{
     this. sobj = {
      page: this.page,
      limit: 10,
      vid: this.vendorId,
      cat:this.categoryId ,
      name: this.itemName ? this.itemName : ''
    };}
    this.itemListService.getItems(this.sobj).subscribe(result => {
      this.page=this.page+1;
      if(optNum !== 1){this.utils.dismissLoading();}
      const cartData = this.itemListService.getCart();
      if (result && result.data) {
        if (result.total === '0') {console.log('text');
          this.text = 'No Data Found.';
          this.totalItems = 0;
          this.itemList = [];
        } else {
          if (optNum === 1) {
            this.itemList = this.itemList.concat(result.data);
            this.totalItems = result.total;
          } else {
            this.itemList = result.data;
            this.totalItems = result.total;
          }
        }
        if (this.itemList) {
          this.itemList.forEach(item => {
            item.qty = 0;
            if (cartData) {
              cartData.forEach(ele => {
                if (ele.id === item.id) {
                  item.qty = ele.qty;
                }
              });
            }
          });
        }
      }
      if (optNum === 2) {
        setTimeout(() => {
          this.inputElement.setFocus();
        }, 300);
      }
      this.totalItemList = this.itemList;
    });
  }

  onClick(item: any) {
    const navigationExtras: NavigationExtras = {
      state: { user: item }
    };
    this.router.navigate(['item-details'], navigationExtras);
  }

  ////////////CART FUNCTIONALITY\\\\\\\\\\\\

  addToCart(event, item: any) {
    event.stopPropagation();
    item.qty = item.qty ? item.qty + 1 : 1;
    this.setItemsTocart();
    this.setCartCount();

  }

  addItem(event, item: any) {
    event.stopPropagation();
    item.qty += 1;
    this.setItemsTocart();
    this.setCartCount();
  }

  removeItem(event, item: any) {
    event.stopPropagation();
    item.qty -= 1;
    this.setItemsTocart();
    this.setCartCount();
  }

  setItemsTocart() {
    const cart = [];
    this.itemList.forEach(element => {
      if (element.qty > 0) {
        cart.push(element);
      }
    });
    this.itemListService.setCart(cart);
  }

  loadData(event) {
    setTimeout(() => {
      if (this.itemList.length ===parseInt(this.totalItems)) {
        event.target.complete();
      } else {
        this.getItemList(1);
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
  getStates() {
    this.storage.get('token').then((token) => {
      this.itemDetailsService.GetStates(token).subscribe((result) => {
        if (result) {
          this.setState(result.existing_states);
        }
      });
    });
  }

  setState(state) {
    this.profileService.setState(state);
  }



}
