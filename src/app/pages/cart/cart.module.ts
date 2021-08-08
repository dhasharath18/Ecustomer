import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {SharedComponentsModule} from'../../components/shared-components.module';
import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
