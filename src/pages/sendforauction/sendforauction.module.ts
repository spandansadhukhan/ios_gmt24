import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendforauctionPage } from './sendforauction';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    SendforauctionPage,
  ],
  imports: [
    IonicPageModule.forChild(SendforauctionPage),
    CalendarModule
  ],
})
export class SendforauctionPageModule {}
