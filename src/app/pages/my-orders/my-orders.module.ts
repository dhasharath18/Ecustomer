import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { MyOrdersPage } from './my-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    IonicModule,
    MyOrdersPageRoutingModule
  ],
  declarations: [MyOrdersPage]
})
export class MyOrdersPageModule {}
