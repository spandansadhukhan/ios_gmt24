import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {AuthServiceProvider}  from '../../providers/auth-service/auth-service'

/**
 * Generated class for the LoyaltyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loyalty-details',
  templateUrl: 'loyalty-details.html',
})
export class LoyaltyDetailsPage {

  responseData: any;
  id: any;
  loyaltyDetailsList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage: Storage, public authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoyaltyDetailsPage');

    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'myLoyalty').then((result) => {
      this.responseData = result
      console.log ( this.responseData)
 
      if( this.responseData.Ack == 1)
      {
       
        this.loyaltyDetailsList =  this.responseData.loyaltyList;
        console.log(this.loyaltyDetailsList);
        
      }
  });

});
  }

}
