import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import { AuctionProductPage } from '../auction-product/auction-product';

/**
 * Generated class for the LoyaltyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loyalty',
  templateUrl: 'loyalty.html',
})
export class LoyaltyPage {


  responseData: any;
  id: any;
  loyaltyList: any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public loyalty:any;
  public Total_Loyalty:any;
  public detailss:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage:Storage, 
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
  ) {
    this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
  }

  myLoyalty

  ionViewDidLoad() {
    this.ChangeToUserLaguage(this.selectedlanguage);
    console.log('ionViewDidLoad LoyaltyPage');

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
       
        this.loyaltyList =  this.responseData.loyaltyList;
        console.log(this.loyaltyList);
        
      }
  });

});

  }

  ChangeToUserLaguage(lang){
    //alert(lang+'a')
      let serval={
        "language_id":lang,
       };
       let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();
    
      this.authService.changeLaguage(serval).subscribe(res=>{
        
        if(res.Ack==1){
         loading.dismiss();
        //console.log(res.languages)
         console.log("splang",res.languages);
         this.loyalty=res.languages.loyalty;
         this.Total_Loyalty=res.languages.Total_Loyalty;
         this.detailss=res.languages.details;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  details()
  {
    this.navCtrl.push('LoyaltyDetailsPage')
  }

}
