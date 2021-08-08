import { Component, OnInit } from '@angular/core';
import { ItemListService } from '../../providers/item-list.service';
import { UtilsService } from 'src/app/providers/utils.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  headerTitle = { title: 'Settings', cart: 0 };
  settings: any[] = [
    { id: 'Change Password', icon: 'hand-left-outline', link: '/change-pass' },
  ];
  constructor(
    private itemListService: ItemListService,
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage,
    private utils: UtilsService
  ) {}
  ngOnInit() {}
  ionViewWillEnter() {
    this.setCartCount();
  }

  setCartCount() {
    console.log('setCartCount');
    this.headerTitle.cart = this.itemListService.getCartLength();
  }
}
