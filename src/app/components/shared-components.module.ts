import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import { IonicModule } from '@ionic/angular';
import {FooterComponent} from './footer/footer.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
const PAGES_COMPONENTS=[
  HeaderComponent,
  FooterComponent,
  EditProfileComponent
];
@NgModule({
  declarations: [ PAGES_COMPONENTS],
  exports: [ PAGES_COMPONENTS],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ]
})
export class SharedComponentsModule { }
