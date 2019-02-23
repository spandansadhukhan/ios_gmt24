import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopproductlistPage } from './shopproductlist';

@NgModule({
  declarations: [
    ShopproductlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopproductlistPage),
  ],
})
export class ShopproductlistPageModule {}
