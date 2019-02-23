import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SubscribedlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscribedlist',
  templateUrl: 'subscribedlist.html',
})
export class SubscribedlistPage {


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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
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
    console.log('ionViewDidLoad SubscribedlistPage');
    this.packageList();
  }


  packageList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.loguser = JSON.parse(localStorage.getItem('userData'));
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
//console.log('dgdfg',this.loguser);
      this.id = this.loguser.user_id;
    let serval={
      "user_id":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'listSubscribed').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        console.log('dgdfg',this.packagelists);
        this.packagelists =  this.responseData.subscribedLists;
        
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



}
