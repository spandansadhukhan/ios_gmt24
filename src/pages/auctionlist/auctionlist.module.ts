import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuctionlistPage } from './auctionlist';

@NgModule({
  declarations: [
    AuctionlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AuctionlistPage),
  ],
})
export class AuctionlistPageModule {}
