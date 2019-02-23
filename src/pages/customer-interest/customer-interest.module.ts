import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerInterestPage } from './customer-interest';

@NgModule({
  declarations: [
    CustomerInterestPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerInterestPage),
  ],
})
export class CustomerInterestPageModule {}
