import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the MessageListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-listing',
  templateUrl: 'message-listing.html',
})
export class MessageListingPage {
  responseData: any;
  id: any;
  messageList: any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public Message_listing;any;
  public Days_ago:any;
  public no_records_found:any;
 
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public authService:AuthServiceProvider,
  public storage:Storage,
  public loadingCtrl: LoadingController,
  public toastCtrl:ToastController,) {
    this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageListingPage');
    this.messagelist();
    this.ChangeToUserLaguage(this.selectedlanguage);
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
      /*this.authService.postData(serval,'changeLaguage').then((result) => {
        this.language = result.languages
        console.log('language',this.language.languages.top_brands);
        
       
      }, (err) => {
        
        console.log(err);
        
      });*/
      
      this.authService.changeLaguage(serval).subscribe(res=>{
        
        if(res.Ack==1){
         loading.dismiss();
        //console.log(res.languages)
         console.log("splang",res.languages);
         this.Message_listing=res.languages.Message_listing;
         this.Days_ago=res.languages.Days_ago;
         this.no_records_found=res.languages.no_records_found;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  messagelist(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listproductMessages').then((result) => {
      this.responseData = result
      console.log ( this.responseData)
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.messageList =  this.responseData.message;
        console.log(this.messageList);
        
      }else
      {
        loading.dismiss();
        this.messageList = '';
      }
     
    }, (err) => {
      loading.dismiss();
      this.presentToast('Error occured.');
      console.log(err);
     
  });
});

  }

  adminmessages(){
    this.navCtrl.push('AdminmessagesPage');
  }

  messageDetails(to_id,from_id,product_id)
  {
    this.navCtrl.push ('MessageDetailsPage',{'to_id':to_id,'from_id':from_id, 'product_id':product_id})
  }

}
