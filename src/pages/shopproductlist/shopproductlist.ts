import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ShopproductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopproductlist',
  templateUrl: 'shopproductlist.html',
})
export class ShopproductlistPage {

  shop_id:any;
  productlists:any;
  responseData:any;
  selectedcurrency:any;
  mycurrency:any;


  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public filters:any;
  public no_records_found:any;
  public seller:any;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,) {
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
    console.log('ionViewDidLoad ShopproductlistPage');
    this.shop_id = this.navParams.get('shopid');
    this.shopproductList(this.shop_id);
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
   
      
      this.authService.changeLaguage(serval).subscribe(res=>{
        
        if(res.Ack==1){
         loading.dismiss();
        //console.log(res.languages)
         console.log("splang",res.languages);
         this.filters=res.languages.filters;
         this.no_records_found=res.languages.no_records_found;
         this.seller=res.languages.seller;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  shopproductList(id){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   // this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    let serval={
      "shop_id":id,
      "currency":this.mycurrency,
    }
    
    this.authService.postData(serval,'ShopListSearch').then((result) => {
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
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

productdetails(product_id){
  //lert(product_id);
    this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
  }

  filter(){

    this.navCtrl.push('FilterPage')

  }

}
