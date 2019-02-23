import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/**
 * Generated class for the CurrencychangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-currencychange',
  templateUrl: 'currencychange.html',
})
export class CurrencychangePage {
  public id:any;
  public responseData:any;
  public currencylist:any;
  public selectedcurrency:any;
  public currency:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public Select_Currency:any;
  public please_Choose_currency:any;
  public Currency:any;
  public Go:any;
  
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public events: Events,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
  ) {
    events.publish('hideFooter', { isHidden: true});
    this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrencychangePage');
    this.ChangeToUserLaguage(this.selectedlanguage);
    this.currencyList();
    this.menu.enable(false, 'loggedOutMenu');

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
         this.Select_Currency=res.languages.Select_Currency;
         this.please_Choose_currency=res.languages.please_Choose_currency;
         this.Currency=res.languages.Currency;
         this.Go = res.languages.Go;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }
  currencyList(){
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listCurrency').then((result) => {
      this.responseData = result
      console.log('currency',this.responseData);
      if( this.responseData.Ack == 1)
      {
       
        this.currencylist =  this.responseData.currencylist;
        
      }
      else
      {
        this.currencylist = '';
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  });
}
currencychange(currency){
  
 // console.log('bbb',currency);
  if(currency){
    this.selectedcurrency = currency;
   // alert(this.selectedcurrency);
  }else{
    this.selectedcurrency = "KWD";
  }
  
}
changecurrency(){
  localStorage.setItem('selectedcurrency', JSON.stringify({"selectedcurrency":this.selectedcurrency}));
  this.navCtrl.setRoot('HomePage');
}
}
