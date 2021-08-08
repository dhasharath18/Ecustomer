import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersummaryService {
  cartItems: Array<any> = [];
  listItems: Array<any> = [];
  finalAddress: any;

  constructor() {}
  setCartListItems(items) {
    this.cartItems = items;
  }
  getCartListItems() {
    return this.cartItems;
  }
  setListItems(items) {
    this.listItems = items;
  }
  getListItems() {
    return this.listItems;
  }
  setFinalAddress(fAddress) {console.log(fAddress);
    this.finalAddress = fAddress;
  }
  getFinalAddress() {
    return this.finalAddress;
  }
}
