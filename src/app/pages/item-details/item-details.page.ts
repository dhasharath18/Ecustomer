import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemListService } from '../../providers/item-list.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  headerTitle = { title: 'Details',cart: 0};
  productDetails: any;
  imageslist;
  quantity: any;
  stock: number;
  cartItems: Array<any> = [];
  cartLength;
  opts = {
    slidesPerView: 2.5,
    spaceBetween: 5,
    freeMode: true,
  };
  private backToProduct= new BehaviorSubject<any>(true);
  constructor(
    private itemListService: ItemListService,
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage,
    private utils: UtilsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.cartItems = this.itemListService.getCart();
  this.setCartCount();
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.productDetails = this.router.getCurrentNavigation().extras.state.user;
        this.stock = parseInt(this.productDetails.stock, 10);
        console.log(this.stock,typeof this.stock);
        this.quantity = this.productDetails.qty;
      }
    });
    this.imageslist = [];
    // eslint-disable-next-line guard-for-in
    if(this.productDetails.images){for (const key in this.productDetails.images)
      { this.imageslist.push({ title: this.productDetails.images[key] }); }
    }
  }
  ////////////CART FUNCTIONALITY\\\\\\\\\\\\

  setCartCount() {
    this.cartLength = this.itemListService.getCartLength();
  }
  openCart(){ this.navCtrl.navigateForward('/cart'); };

  addToCart() {
    this.storage.get('token').then((token) => {
      if (token) {
        this.productDetails.qty  =  this.productDetails.qty  ?  this.productDetails.qty + 1 : 1;
        this.quantity=this.productDetails.qty;
         this.setItemsTocart();
        this.setCartCount();
      } else {
        this.navCtrl.navigateForward('/login');
      }
    });

  }

  addItem() {
    this.quantity += 1;
    this.cartItems.forEach((item) => {
      if(this.productDetails.id===item.id) {
        item.qty=this.quantity;
      }
    });
    this.itemListService.setCart(this.cartItems);
    this.setCartCount();
  }

  removeItem() {
    this.quantity-= 1;
    this.cartItems.forEach((item) => {
      if(this.productDetails.id===item.id) {
        item.qty=this.quantity;
      }
    });
   if(this.quantity===0){
     this.cartItems.forEach((item, index) => {
       if(this.productDetails.id===item.id){
         item.qty=0;
         this.cartItems.splice(index,1);
       }
     });
   }
    this.itemListService.setCart(this.cartItems);
    this.setCartCount();
  }

  setItemsTocart() {
      if(this.cartItems){
        this.cartItems.push(this.productDetails);
      }
  }
  buyNow(){
   this.itemListService.setBuyNow('buyNow');
    const navigationExtras: NavigationExtras = {
      state: { buy: this.productDetails }
    };
    this.router.navigate(['/ordersummary'], navigationExtras);
  }

  getitem() {
    // eslint-disable-next-line max-len
    const tot = (this.productDetails.actual_price - (this.productDetails.actual_price - this.productDetails.discounted_price)) / this.productDetails.actual_price;
    const total =parseFloat((tot * 100).toFixed(0));
    const totalPrice=Math.trunc(total);
    return totalPrice;
  }
}
