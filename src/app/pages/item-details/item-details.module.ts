import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsPageRoutingModule } from './item-details-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { ItemDetailsPage } from './item-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    IonicModule,
    ItemDetailsPageRoutingModule
  ],
  declarations: [ItemDetailsPage]
})
export class ItemDetailsPageModule {}
