import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForPassPageRoutingModule } from './for-pass-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { ForPassPage } from './for-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ForPassPageRoutingModule
  ],
  declarations: [ForPassPage]
})
export class ForPassPageModule {}
