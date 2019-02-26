import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import {MyApp} from '../../app/app.component';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public responseData:any;
  public id:any;
  public brandlists:any;
  public topmodellists:any;
  public topproductlists:any;
  public latestproductlist:any;
  wordlists:any;
  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public our_brands:any;
  public category:any;
  public special_auction:any;
  public ladies_watch:any
  public best_sellers:any;
  public top_products:any;
  public view:any;
  public homes:any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public myApp:MyApp) {

      this.languages = JSON.parse(localStorage.getItem('language'));
      //console.log('Arunavalang',this.languages)
      if(this.languages){
        this.selectedlanguage = this.languages.language;
      }else{
        this.selectedlanguage ='1';
      }
      //console.log('Arunavalang',this.languages)


      this.ChangeToUserLaguage(this.selectedlanguage);
    this.myApp.abc();
    this.myApp.ChangeToUserLaguage1(this.selectedlanguage);
    this.menu.enable(true, 'loggedOutMenu');
    this.homemenus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
   
  }

  

  homemenus(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'homeSettings_app').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.brandlists =  this.responseData.brandList;
        this.topmodellists =  this.responseData.topmodellist;
        this.topproductlists = this.responseData.topproductlist;
        this.latestproductlist=this.responseData.latestproductlist
        //console.log('brand',this.brandlists)
      }
      
      else
      {
        loading.dismiss();
        this.brandlists = '';
        this.topmodellists = '';
        this.topproductlists ='';
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  });

  }


//spandan end

brandproduct(bid){

  this.navCtrl.push('SearchPage',{"brand_id":bid}); 
}
productdetails(product_id){
//lert(product_id);
  this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
}


updateKeyword(keyword){

  //alert(keyword);
 if(keyword!=""){
  let serval={
    "word":keyword
  }
  
  this.authService.postData(serval,'autofield').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
      
      this.wordlists =  this.responseData.autofieldlist;
       //console.log('arunava',this.productlists)
    }
    else
    {
      this.wordlists = [];
      //this.msg =this.responseData.msg; 
    }
   
  }, (err) => {
    console.log(err);
    
  });
}else{
  this.wordlists = [];
  
}
}

selectSearchResult(item) {

  this.wordlists = [];
  this.navCtrl.push('SearchPage',{"keyword":item}); 
}


ChangeToUserLaguage(lang){
//alert(lang+'a')
  let serval={
    "language_id":lang,
   };
  /*this.authService.postData(serval,'changeLaguage').then((result) => {
    this.language = result.languages
    console.log('language',this.language.languages.top_brands);
    
   
  }, (err) => {
    
    console.log(err);
    
  });*/
  
  this.authService.changeLaguage(serval).subscribe(res=>{
    if(res.Ack==1){
    // loading.dismiss();
    //console.log(res.languages)
     console.log("splang",res.languages);
     this.our_brands=res.languages.our_brands;
     this.category=res.languages.category;
     this.special_auction=res.languages.special_auction;
     this.ladies_watch = res.languages.ladies_watch;
     this.best_sellers = res.languages.best_sellers;
     this.top_products= res.languages.top_products;
     this.view= res.languages.view;
     this.homes = res.languages.home;
    }else{

     //loading.dismiss();
    
    }
   },err=>{
     //loading.dismiss();
    
  });

}
//Arunava
topuservendor() {

  localStorage.setItem('top_user_vendor', JSON.stringify({"top_user_vendor":'1'}));
  this.navCtrl.push('AllshoplistPage');
}

spcealauction() {
//alert();
  localStorage.setItem('is_special_auction', JSON.stringify({"is_special_auction":'1'}));
  this.navCtrl.push('AuctionlistPage');
}

ladieswatch() {
 // alert();
     localStorage.setItem('gender', JSON.stringify({"gender":'Female'}));
     this.navCtrl.push('SearchPage');
  }

  topproduct() {
    // alert();
        localStorage.setItem('top_prodct', JSON.stringify({"top_product":'1'}));
        this.navCtrl.push('SearchPage');
     }
}
