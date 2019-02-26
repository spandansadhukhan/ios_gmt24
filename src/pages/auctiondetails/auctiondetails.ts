import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AuctiondetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auctiondetails',
  templateUrl: 'auctiondetails.html',
})
export class AuctiondetailsPage {
  isShow:boolean=false;
  sliderimages:any;
  product_id:any;
  responseData:any;
  productLists:any;
  user_id:any;
  currency:any;
  price:any;
  brands:any;
  category:any;
  gender:any;
  seller_name:any;
  product_single_image:any;
  currency_code:any;
  totallike:any;
  ptype:any;
  seller_id:any;
  loguser:any;
  auction_end_time:any;

  seller_phone:any;
  seller_address:any;
  breslet_type:any;
  size:any;
  model_year:any;
  movement:any;
  date_purchase:any;
  status_watch:any;
  description:any;
  reference_no:any;
  ctime:any;
  start_time:any;
  selectedcurrency:any
  mycurrency:any;;
 
  bidhistory:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public Auction_Details;any;
  public Product_Bracelet_Type:any;
  public Product_Description:any;
  public Product_Size:any;
  public Seller_Info:any;
  public Name:any;
  public phone:any;
  public Bidder_Name:any;
  public time_remaining:any;
  public Cancel:any;

  public auction_date:any;
  public Auction_Status:any;
  public Bid_Price:any;
  


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

      this.loguser =  JSON.parse(localStorage.getItem('userData'));
      this.user_id=this.loguser.user_id;
      this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
      if(this.selectedcurrency){
        this.mycurrency = this.selectedcurrency.selectedcurrency;
      }else{
        this.mycurrency ='KWD';
      }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuctiondetailsPage');
    this.product_id = this.navParams.get('product_id');
    this.productsDetails(this.product_id);
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
         this.Auction_Details=res.languages.Auction_Details;
         this.Product_Bracelet_Type=res.languages.Product_Bracelet_Type;
         this.Product_Description=res.languages.Product_Description;
         this.Product_Size = res.languages.Product_Size;
         this.Seller_Info = res.languages.Seller_Info;
         this.Name = res.languages.Name;
         this.phone = res.languages.phone;
         this.Bidder_Name = res.languages.Bidder_Name;
         this.time_remaining = res.languages.time_remaining;
         this.Cancel = res.languages.Cancel;
         this.auction_date = res.languages.auction_date;
         this.Auction_Status = res.languages.Auction_Status;
         this.Bid_Price = res.languages.Bid_Price
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }
  productsDetails(product_id){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    let serval={
      "product_id":product_id,
      "user_id":this.user_id,
      "currency":this.mycurrency,
    }
    
    this.authService.postData(serval,'ProductsDetails_app').then((result) => {
      this.responseData = result
     //alert(this.responseData.Ack);
     console.log('productsdetails',this.responseData);
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.ptype =  this.responseData.type;
        
        this.productLists =  this.responseData.productList;
        this.price=this.productLists.price;
        this.brands=this.productLists.brands;
        this.category=this.productLists.category;
        this.gender=this.productLists.gender;
        this.seller_name=this.productLists.seller_name;
        this.product_single_image=this.productLists.product_single_image;
        
        this.currency_code=this.productLists.currency_code;
        this.totallike=this.productLists.totallike;
        this.seller_id=this.productLists.seller_id;
        this.seller_phone=this.productLists.seller_phone;
        this.seller_address=this.productLists.seller_address;
        this.breslet_type=this.productLists.breslet_type;
        this.size=this.productLists.size;
        this.model_year=this.productLists.model_year;
        this.movement=this.productLists.movement;
        this.date_purchase=this.productLists.date_purchase;
        this.status_watch=this.productLists.status_watch;
        this.description=this.productLists.description;
        this.reference_no=this.productLists.reference_no;
        this.start_time=this.productLists.start_time;
        this.ctime=this.productLists.ctime;
        
        this.sliderimages=this.productLists.image;
       
        this.bidhistory=this.productLists.bidhistory;
         //console.log('arunava',this.productLists)
      }
      else
      {
        loading.dismiss();
        this.productLists = '';
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}




  show()
  {
    
    this.isShow =true;
    
  }

  hide() {
    this.isShow =false;
  }

}
