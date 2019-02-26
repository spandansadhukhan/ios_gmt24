import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveAuctionPage } from './live-auction';

@NgModule({
  declarations: [
    LiveAuctionPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveAuctionPage),
    
  ],
})
export class LiveAuctionPageModule {}
