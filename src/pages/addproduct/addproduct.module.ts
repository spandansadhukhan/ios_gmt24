import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddproductPage } from './addproduct';
import { CalendarModule } from "ion2-calendar";
@NgModule({
  declarations: [
    AddproductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddproductPage),
    CalendarModule
  ],
})
export class AddproductPageModule {}
