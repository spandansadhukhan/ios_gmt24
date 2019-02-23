import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AuctionlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auctionlist',
  templateUrl: 'auctionlist.html',
})
export class AuctionlistPage {

  responseData:any;
  productlists:any;
  loguser:any;
  selectedcurrency :any;
  mycurrency:any;
  is_special_auction:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public phone:any;
  public no_records_found:any;
  public filters:any;
  public seller:any
  public is_special:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,) {

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
    console.log('ionViewDidLoad AuctionlistPage');
    this.ChangeToUserLaguage(this.selectedlanguage);
    this.auctionList();
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
         this.phone=res.languages.phone;
         this.filters=res.languages.filters;
         this.no_records_found=res.languages.no_records_found;
         this.seller = res.languages.seller;

         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }
  auctionList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    //console.log('sp',this.loguser);
    this.is_special_auction =  JSON.parse(localStorage.getItem('is_special_auction'));
    if(this.is_special_auction){
      this.is_special=1;
    }else{
      this.is_special=0;
    }
    let serval={
      "user_id":this.loguser.user_id,
      "currency":this.mycurrency,
      "is_special_auction":this.is_special,
    }
    
    this.authService.postData(serval,'auctionListSearch').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.productlists =  this.responseData.productList;
         //console.log('arunava',this.productlists)
      }
      else
      {
        loading.dismiss();
        this.productlists = '';
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

productdetails(product_id){
  
    this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
  }



  filter(){

    this.navCtrl.push('FilterPage')

  }

  public changecurrency(){ 
  
    this.navCtrl.push('CurrencychangePage');
    
    }

  //Arunava
  ionViewWillLeave(){

    localStorage.removeItem('is_special_auction');
    //this.top_user_vendor.top_user_vendor = 0;
  }
}
