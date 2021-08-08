import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
