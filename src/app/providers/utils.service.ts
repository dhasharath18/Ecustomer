import { Injectable } from '@angular/core';
import {LoadingController,AlertController} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading: any;
  loader: string;
  profile: string;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController) { }


    async presentAlert(head,body,cls: string='success') {
      const alert = await this.alertController.create({
        header: head,
        message: body,
        buttons: ['OK'],
        cssClass: 'alert-'+cls
      });
      await alert.present();
    }


    async presentLoading() {console.log('presentLoading');
      this.loading = true;
      return await this.loadingController.create({
        message: 'Loading ',
        spinner: 'crescent' ,
        duration: 60000,
        cssClass: 'loader'
      }).then(a => {
        a.present().then(() => {
          if (!this.loading) {
            a.dismiss().then();
          }
        });
      });
    }

    async dismissLoading() {console.log('dismissLoading');
      this.loading = false;
      return await this.loadingController.dismiss().then();
    }

setparam(a) {
  this.loader=a;
}
getLoader() { return this.loader;}

setprofile(a) {
  this.profile=a;
}

getProfileParameter() { return this.profile;}

}
