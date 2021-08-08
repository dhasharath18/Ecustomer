import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from './providers/auth.service';
import {MenuService} from './providers/menu.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import {NavController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
    pages;
  vendorId = 3;
 
  authToken:string;

  constructor(
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private menuService: MenuService,
    private splashScreen: SplashScreen,
    private authService: AuthService,
    private platform: Platform,
    private storage: Storage) {
    this.authService.setVendorId(this.vendorId);
    this.storage.get("token").then((token) => {
      if (token) {
        this.pages = [
          { title: "Home", url: '/item-list', icon: 'home' },
          { title: 'My Orders ', url: '/my-orders', icon: 'list' },
          { title: 'My Account', url: '/profile', icon: 'person' },
          { title: 'Settings', url: '/settings', icon: 'settings' },
           { title: 'LogOut ', url: '/logout', icon: 'power' },
        ]
      } else {
        this.pages = [
          { title: "Home", url: '/item-list', icon: 'home' },
           { title: 'Login ', url: '/login', icon: 'power' },
        ]
      }
    })
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#02CCBC');
      this.splashScreen.hide();
    }
    );
  }

  ngOnInit() {
// this.appPages=this.menuService.getpages();
  }

  logout(){
    this.pages = [
      { title: "Home", url: '/item-list', icon: 'home' },
      { title: 'My Orders ', url: '/my-orders', icon: 'list' },
      { title: 'My Cart ', url: '/cart', icon: 'cart' },
      { title: 'My Account', url: '/profile', icon: 'person' },
      { title: 'Settings', url: '/settings', icon: 'settings' },
       { title: 'LogOut ', url: '/logout', icon: 'power' },
    ]
  }
login(){
  this.pages = [
    { title: "Home", url: '/item-list', icon: 'home' },
     { title: 'Login ', url: '/login', icon: 'power' },
  ]
}
  // logOut() {
  //   this.logout=false;
  //   this.storage.clear();
  //   this.navCtrl.navigateForward("/login");
  //  this. isUserLoggedIn.next(true)
  //   // this.appPages=this.menuService.getpages();
  // }
 
}
