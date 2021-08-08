import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemListPageRoutingModule } from './item-list-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { ItemListPage } from './item-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    IonicModule,
    ItemListPageRoutingModule
  ],
  declarations: [ItemListPage]
})
export class ItemListPageModule {}
