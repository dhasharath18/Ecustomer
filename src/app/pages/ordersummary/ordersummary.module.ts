import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdersummaryPageRoutingModule } from './ordersummary-routing.module';
import {SharedComponentsModule} from'../../components/shared-components.module';
import { OrdersummaryPage } from './ordersummary.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    IonicModule,
    OrdersummaryPageRoutingModule
  ],
  declarations: [OrdersummaryPage]
})
export class OrdersummaryPageModule {}
