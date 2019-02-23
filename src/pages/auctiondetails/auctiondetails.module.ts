import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuctiondetailsPage } from './auctiondetails';

@NgModule({
  declarations: [
    AuctiondetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AuctiondetailsPage),
  ],
})
export class AuctiondetailsPageModule {}
