import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOrderBuyerPage } from './list-order-buyer';

@NgModule({
  declarations: [
    ListOrderBuyerPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOrderBuyerPage),
  ],
})
export class ListOrderBuyerPageModule {}
