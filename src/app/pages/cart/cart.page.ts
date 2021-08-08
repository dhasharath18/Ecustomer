import { Component, OnInit } from '@angular/core';
import { ItemListService } from 'src/app/providers/item-list.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  headerTitle = { title: 'Cart', cart: 0 };
  cartItems: Array<any> = [];
  cart: any;
  constructor(
    private itemListService: ItemListService,
    private navCtrl: NavController,
    private storage: Storage,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.cartItems = this.itemListService.getCart();
    this.setCartCount();
  }

  setCartCount() {
    this.headerTitle.cart = this.itemListService.getCartLength();
  }

  addItems() {
    this.navCtrl.navigateBack('/item-list');
  }
  addItem(item) {
    item.qty += 1;
    this.setItemsToService();
  }
  removeItem(item) {
    if (item.qty <= 1) {
      this.deleteItem(item);
    } else {
      item.qty -= 1;
      this.setItemsToService();
    }
  }

  deleteItem(item) {
    const cartUpdate = [];
    if (this.cartItems) {
      this.cartItems.forEach(element => {
        if (item.id !== element.id) {
          cartUpdate.push(element);
        }
      });
    }
    this.itemListService.setCart(cartUpdate);
    this.cartItems = cartUpdate;
    this.headerTitle.cart = this.itemListService.getCartLength();
  }

  setItemsToService() {
    const cartUpdate = [];
    if (this.cartItems) {
      this.cartItems.forEach(element => {
        cartUpdate.push(element);
      });
    }
    this.itemListService.setCart(cartUpdate);
  }

  total(): string {
    return this.itemListService.Total().toFixed(2);
  }

  deleteProduct(item) {
    this.cartItems.forEach((element, index) => {
      if (item.id === element.id) {
        this.cartItems.splice(index, 1);
      }
    });
  }

  navigateToPayment() {
    this.storage.get('token').then((token) => {
      if(token){ const navigationExtras: NavigationExtras = {
        state: { user: this.cartItems }
      };
      this.router.navigate(['/ordersummary'], navigationExtras);
    }
      else{
        this.navCtrl.navigateForward('/login');
      }
    }
    );
  }
}
