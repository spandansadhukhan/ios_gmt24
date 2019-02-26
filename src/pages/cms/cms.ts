import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the CmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cms',
  templateUrl: 'cms.html',
})
export class CmsPage {

  cmsid:any;
  details:any;
  responseData:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,) {

      this.cmsid=this.navParams.get('id');
      this.cmsdetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CmsPage');
  }


  cmsdetails(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();

    let serval={
      "id": this.cmsid,
    }
    
    this.authService.postData(serval,'getCms').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.details =  this.responseData.cmsdetails.pagedetails;
      }
      else
      {
        loading.dismiss();
        this.details = '';
        
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
}



}
