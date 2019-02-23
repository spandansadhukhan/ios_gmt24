import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyauctionPage } from './myauction';

@NgModule({
  declarations: [
    MyauctionPage,
  ],
  imports: [
    IonicPageModule.forChild(MyauctionPage),
  ],
})
export class MyauctionPageModule {}
