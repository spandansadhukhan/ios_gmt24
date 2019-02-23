import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the CustomerInterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-interest',
  templateUrl: 'customer-interest.html',
})
export class CustomerInterestPage {


  interestList: any;
  id:any;
  responseData:any;
  selectedcurrency:any;
  mycurrency:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public interested_product_by_users;any;
  public Remove:any;
  public show_interest:any;
  public no_records_found:any;
  isShow:boolean=false;
  userdetails:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider, 
    public storage: Storage,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber) {


      this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }

      this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
      if(this.selectedcurrency){
        this.mycurrency = this.selectedcurrency.selectedcurrency;
      }else{
        this.mycurrency ='KWD';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerInterestPage');
    this.interestlist();
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
         this.interested_product_by_users=res.languages.interested_product_by_users;
         this.Remove=res.languages.Remove;
         this.show_interest=res.languages.show_interest;
         this.no_records_found = res.languages.no_records_found;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }


  interestlist(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'interestedproduct').then((result) => {
      this.responseData = result
  
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.interestList =  this.responseData.productList;
        console.log(this.interestList);
        
      } else
      {
        loading.dismiss();
        this.interestList ="";
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
  
  });
  
  
  
  }
  
  
    productdetails(product_id){
      
      this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
    }
  

    showuserdetails(uid){

      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();
      
      let serval={
        "user_id":uid,
       };
      this.authService.postData(serval,'showuser').then((result) => {
        this.responseData = result
    
        if( this.responseData.Ack == 1)
        {
          loading.dismiss();
          this.isShow=true;
          this.userdetails =  this.responseData.userinfo;
          
        } else
        {
          loading.dismiss();
          this.userdetails ="";
        }
       
      }, (err) => {
        loading.dismiss();
        console.log(err);
        
      });
    
    }

    hide(){
      this.isShow=false;

    }


    call(number){
      this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    }

}
