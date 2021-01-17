import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MekanPageRoutingModule } from './mekan-routing.module';

import { MekanPage } from './mekan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MekanPageRoutingModule
  ],
  declarations: [MekanPage]
})
export class MekanPageModule {}
