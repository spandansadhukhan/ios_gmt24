import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoyaltyDetailsPage } from './loyalty-details';

@NgModule({
  declarations: [
    LoyaltyDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoyaltyDetailsPage),
  ],
})
export class LoyaltyDetailsPageModule {}
