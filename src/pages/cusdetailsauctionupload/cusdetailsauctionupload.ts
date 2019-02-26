import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the CusdetailsauctionuploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cusdetailsauctionupload',
  templateUrl: 'cusdetailsauctionupload.html',
})
export class CusdetailsauctionuploadPage {

  customerForm: FormGroup;
  pid:any;
  responseData:any;
  loguser:any;
  packagedetails:any;
  price:any;
  url:any;
  user_type:any;



  public languages:any;
  public selectedlanguage:any;
  select:any;
  Package:any;
  Name:any;
  email:any;
  phone:any;
  this_field_is_required:any;
  Total_Amount:any;
  pay_now:any;
  Loyalty_Redeem:any;
  Loyalty_Remain:any;
  please_select:any;
  Customer_Details:any;
  Days:any;
  for:any;


  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',
  }


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private builder: FormBuilder,
    private theInAppBrowser: InAppBrowser,) {

      this.customerForm = builder.group({
     
        'name': [null, Validators.required],
        'email': [null, Validators.required],
        'phone': [null, Validators.required],
        'loyalty_redeem':[null,null],
      });

      this.loguser = JSON.parse(localStorage.getItem('userData'));
  //console.log('vcdfd',this.loguser);
  this.user_type=this.loguser.user_type;


  this.languages = JSON.parse(localStorage.getItem('language'));
  //console.log('Arunavalang',this.languages)
  if(this.languages){
    this.selectedlanguage = this.languages.language;
  }else{
    this.selectedlanguage ='1';
  }
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CusdetailsauctionuploadPage');
    this.pid=this.navParams.get('pid');
    this.productDetails();
    this.ChangeToUserLaguage(this.selectedlanguage);
  }


  productDetails(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    //this.loguser = JSON.parse(localStorage.getItem('userData'));
    let serval={
      "product_id":this.pid,
      
     };
    this.authService.postData(serval,'auctionpricedetails').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.packagedetails =  this.responseData.packagedetails;
        this.price=this.packagedetails.price;

      }
      else
      {
        loading.dismiss();
        this.packagedetails = '';
        
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}


submit(formData) {
  
  this.loguser = JSON.parse(localStorage.getItem('userData'));
  formData.user_id = this.loguser.user_id;
  formData.product_id=this.pid;
  formData.loyalty_redeem= 0;

  console.log('dfdf',formData);
  this.authService.auctionuploapayment(formData).subscribe(res => {
   if (res.Ack == 1) {
   
    let target = "_self";
    let browserInst = new InAppBrowser();
    let browser = browserInst.create(res.url, 'target', this.options)
    } 
    else {

      const alert = this.alertCtrl.create({
        title: 'Something went wrong.',
        buttons: ['OK']
      });
      alert.present();
    }
  }, err => {
    console.log(err);
  });

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
      //console.log('Arunavalang',res.languages)
       //console.log("splang",res.languages);
       this.select=res.languages.select;
       this.Package=res.languages.Package;
       this.Name=res.languages.Name;
       this.email=res.languages.email;
       this.phone=res.languages.phone;
      this.this_field_is_required = res.languages.this_field_is_required;
      this.Total_Amount= res.languages.Total_Amount;
      this.pay_now=res.languages.pay_now;
      this.Loyalty_Redeem = res.languages.Loyalty_Redeem;
      this.Loyalty_Remain = res.languages.Loyalty_Remain;
      this.please_select=res.languages.please_select;
      this.Customer_Details=res.languages.Customer_Details;
      this.Days = res.languages.Days;
      this.for = res.languages.for
       //this.Cancel= res.languages.Cancel;
      }else{
  
       //loading.dismiss();
      
      }
     },err=>{
       //loading.dismiss();
      
    });
  
  }


}
