import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscribedlistPage } from './subscribedlist';

@NgModule({
  declarations: [
    SubscribedlistPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscribedlistPage),
  ],
})
export class SubscribedlistPageModule {}
