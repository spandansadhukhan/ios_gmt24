import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public new_message_notify_value:any;
  notify: FormGroup;
  
  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public Notify_me_When_my_product_has_been_reviewed:any;
  public notify_me_when_my_auction_is_approved_or_added:any;
  public notify_me_when_my_product_is_approved_or_added:any;
  public When_I_receive_a_new_message:any;
  public Yes:any;
  public No:any;
  public Save_Changes:any;
  public notification_settings:any;
  loguserdetails:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertCtrl: AlertController,
  ) {
    this.languages = JSON.parse(localStorage.getItem('language'));
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }

    this.notify = fb.group({
      'new_message_notify': [null,null], 
      'add_product_notify': [null,null],
      'auction_notify' : [null,null],
      'review_notify' : [null,null],
    });

   


    this.loguserdetails=JSON.parse(localStorage.getItem('userData'));
     
          this.authService.getdetails({ user_id:this.loguserdetails.user_id  }).subscribe(res => {
           // console.log(res.UserDetails.first_name);
           
            this.notify.controls['new_message_notify'].setValue(res.UserDetails.new_message_notify);
            this.notify.controls['add_product_notify'].setValue(res.UserDetails.add_product_notify);
            this.notify.controls['auction_notify'].setValue(res.UserDetails.auction_notify);
            this.notify.controls['review_notify'].setValue(res.UserDetails.review_notify);
           
          });
        
    
   
  }

  
  
  ChangeToUserLaguage(lang){
    //alert(lang+'a')
      
       let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();
      
      let serval={
        "language_id":lang,
       };
      
      this.authService.changeLaguage(serval).subscribe(res=>{
        
        if(res.Ack==1){
         loading.dismiss();
        //console.log(res.languages)
         //console.log("splang",res.languages);
         this.Notify_me_When_my_product_has_been_reviewed=res.languages.Notify_me_When_my_product_has_been_reviewed;
         this.notify_me_when_my_auction_is_approved_or_added=res.languages.notify_me_when_my_auction_is_approved_or_added;
         this.notify_me_when_my_product_is_approved_or_added=res.languages.notify_me_when_my_product_is_approved_or_added;
         this.When_I_receive_a_new_message = res.languages.When_I_receive_a_new_message;
         this.Yes = res.languages.Yes;
         this.No = res.languages.No;
         this.Save_Changes = res.languages.Save_Changes;
         this.notification_settings=res.languages.notification_settings;
        
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.ChangeToUserLaguage(this.selectedlanguage);
  }


  notifySetting(formData) {
    //console.log('Arufrom',formData);
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   this.storage.get('uid').then(val => {
    formData['user_id'] = val;
   
    this.authService.notifysettings(formData).subscribe(res => {
     if (res.Ack == 1) {
      loading.dismiss();
        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
        alert.present();
      } 
      else {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
        alert.present();
      }
    }, err => {
      loading.dismiss();
      console.log(err);
    });
  });
  }
}
