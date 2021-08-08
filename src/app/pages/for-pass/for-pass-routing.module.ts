import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForPassPage } from './for-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ForPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForPassPageRoutingModule {}
