import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChangePassPageRoutingModule } from './change-pass-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { ChangePassPage } from './change-pass.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FormsModule,
    IonicModule,
    ChangePassPageRoutingModule
  ],
  declarations: [ChangePassPage]
})
export class ChangePassPageModule {}
