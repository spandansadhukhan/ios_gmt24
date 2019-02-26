import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the MyInterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-interest',
  templateUrl: 'my-interest.html',
})
export class MyInterestPage {
  interestList: any;
  id:any;
  responseData:any;
  selectedcurrency:any;
  mycurrency:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public no_records_found;any;
  public interested_product:any;
  public Remove:any;

  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public authService:AuthServiceProvider, 
  public storage: Storage,
  public loadingCtrl: LoadingController,) {

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
    console.log('ionViewDidLoad MyInterestPage');
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
         this.no_records_found=res.languages.no_records_found;
         this.interested_product=res.languages.interested_product;
         this.Remove=res.languages.Remove;

        
         
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
  this.authService.postData(serval,'interestinproduct').then((result) => {
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




}
