import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { CheckoutPage } from './checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    IonicModule,
    CheckoutPageRoutingModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
