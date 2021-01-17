import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LokasyonPage } from './lokasyon.page';

const routes: Routes = [
  {
    path: '',
    component: LokasyonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LokasyonPageRoutingModule {}
