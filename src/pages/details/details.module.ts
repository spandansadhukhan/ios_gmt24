import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPage } from './details';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    DetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
    IonicImageViewerModule,
    Ionic2RatingModule
  ],
})
export class DetailsPageModule {}
