import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CmsPage } from './cms';

@NgModule({
  declarations: [
    CmsPage,
  ],
  imports: [
    IonicPageModule.forChild(CmsPage),
  ],
})
export class CmsPageModule {}
