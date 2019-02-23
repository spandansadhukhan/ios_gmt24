import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageListingPage } from './message-listing';

@NgModule({
  declarations: [
    MessageListingPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageListingPage),
  ],
})
export class MessageListingPageModule {}
