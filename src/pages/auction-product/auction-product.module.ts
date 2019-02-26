import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuctionProductPage } from './auction-product';

@NgModule({
  declarations: [
    AuctionProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AuctionProductPage),
  ],
})
export class AuctionProductPageModule {}
