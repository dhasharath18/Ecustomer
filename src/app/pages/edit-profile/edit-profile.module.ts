import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { EditProfilePage } from './edit-profile.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
