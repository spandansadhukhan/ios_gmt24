import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  public id:any;
  public responseData:any;
  public notificationlists:any;
  public msg:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public notifications:any;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {
      this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.ChangeToUserLaguage(this.selectedlanguage);
    this.notificationList();
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
         this.notifications=res.languages.notifications;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
          //alert('1');
         loading.dismiss();
        
        }
       },err=>{
         loading.dismiss();
        
      });
    
    }
  notificationList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'ListNotification').then((result) => {
      this.responseData = result
  
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.notificationlists =  this.responseData.all_notifications;
      }
      else
      {
        loading.dismiss();
        this.notificationlists = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  });
}

gotowinpayment(id){

  this.navCtrl.push('CusdetailswinerpaymentPage',{'aid':id});
  //alert(id);
}

}
