import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the ListOrderBuyerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-order-buyer',
  templateUrl: 'list-order-buyer.html',
})
export class ListOrderBuyerPage {
  responseData: any;
  auctionList: any;
  id: any;
  selectedcurrency:any;
  mycurrency:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public purchase_won_auction_lists;any;
  public product:any;
  public Total_Amount:any;
  public auction_date:any;
  public status:any;
  public view:any;
  public Purchased:any;

  public Pay:any;
  public no_records_found:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public storage: Storage,
  public authService: AuthServiceProvider,
  public loadingCtrl: LoadingController,
) {
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
    console.log('ionViewDidLoad ListOrderBuyerPage');
    this.Listwinauction();
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
         this.purchase_won_auction_lists=res.languages.purchase_won_auction_lists;
         this.product=res.languages.product;
         this.Total_Amount=res.languages.Total_Amount;
         this.auction_date = res.languages.auction_date;
         this.status = res.languages.status;
         this.view = res.languages.view;
         this.Purchased = res.languages.Purchased;
         this.Pay = res.languages.Pay;
         this.no_records_found = res.languages.no_records_found;
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  Listwinauction(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    this.storage.get('uid').then(val => {
      this.id = val;
      
    let serval={
      "userid":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'ListOrderBuyer').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.auctionList =  this.responseData.allorders;
        console.log(this.auctionList);
        
      }else
      {
        loading.dismiss();
        this.auctionList = '';
        
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
  
  });

});

  }


  nextPage(pid)
  {
  this.navCtrl.push('AuctiondetailsPage',{"product_id":pid});
  }

  gotowinpayment(id){

    this.navCtrl.push('CusdetailswinerpaymentPage',{'aid':id});
  }


}
