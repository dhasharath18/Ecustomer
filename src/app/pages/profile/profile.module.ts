import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
 import {MatExpansionModule} from '@angular/material/expansion';
import { ProfilePageRoutingModule } from './profile-routing.module';
import {SharedComponentsModule} from 'src/app/components/shared-components.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
     MatExpansionModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
