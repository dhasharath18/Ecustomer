import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAddressPageRoutingModule } from './edit-address-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { EditAddressPage } from './edit-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    IonicModule,
    EditAddressPageRoutingModule
  ],
  declarations: [EditAddressPage]
})
export class EditAddressPageModule {}
