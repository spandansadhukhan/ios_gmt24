import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AllsubscriptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allsubscriptions',
  templateUrl: 'allsubscriptions.html',
})
export class AllsubscriptionsPage {


  packagelists:any;
  public id:any;
  public responseData:any;
  public loguser:any;
  public utype:any;
  public msg:any;
  public selectedcurrency:any;
  public mycurrency:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;

  subscriptions:any;
  Slots:any;
  Duration:any;
  Purchased:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

      this.loguser = JSON.parse(localStorage.getItem('userData'));
      this.utype=this.loguser.user_type;
      this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
      if(this.selectedcurrency){
        this.mycurrency = this.selectedcurrency.selectedcurrency;
      }else{
        this.mycurrency ='KWD';
      }

      this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllsubscriptionsPage');
    this.packageList();
    this.ChangeToUserLaguage(this.selectedlanguage);
  }


  packageList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.loguser = JSON.parse(localStorage.getItem('userData'));
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
console.log('dgdfg',this.loguser);
      this.id = this.loguser.user_id;
      
    let serval={
      "user_id":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'listSubscriptions').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        console.log('dgdfg',this.packagelists);
        this.packagelists =  this.responseData.subscriptionlist;
        
      }
      else
      {
        loading.dismiss();
        this.packagelists = '';
        
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

purchase(id){

this.navCtrl.push('CusdetailtsforpaymentPage',{'pid':id});

}


ChangeToUserLaguage(lang){
  //alert(lang+'a')
    let serval={
      "language_id":lang,
     };
   
    
    this.authService.changeLaguage(serval).subscribe(res=>{
      if(res.Ack==1){
     
       this.subscriptions=res.languages.subscriptions;
       this.Slots=res.languages.Slots;
       this.Duration=res.languages.Duration;
       this.Purchased=res.languages.Purchased;
      
      }else{
  
       //loading.dismiss();
      
      }
     },err=>{
       //loading.dismiss();
      
    });
  
  }

}
