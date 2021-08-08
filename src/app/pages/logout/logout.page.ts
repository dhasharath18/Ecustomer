import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../providers/auth.service';
import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private storage: Storage,
    private appComponent: AppComponent,
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private navCtrl: NavController) {}

  ngOnInit() {console.log('ngOnInit');
    this.storage.get('token').then((token) => {
      if(token) {
        this.appComponent.login();
         this.storage.remove('token');
         this.navCtrl.navigateForward('/item-list');
        // this.authService.isUserLoggedIn.next(true);
        // this.ref.detectChanges()
        //  location.reload()
      }else{

      }
    });
  }

}
