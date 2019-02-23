import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController,ToastController,AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {  Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  sellercontactfrom:FormGroup;
  //images = ['item-1.jpg', 'item-2.jpg', 'item-3.jpg', 'item-4.jpg'];

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
  averagerating:any;
  currency_code:any;
  totallike:any;
  ptype:any;
  seller_id:any;
  loguser:any;
  interest:any;
  is_fav:any;

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
  reviews:any;
  isShow:boolean=false;
  rate:any;
  review:any;
  recomend:any;
  user_type:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public reviewss:any;
  public Recommend_this_product:any;
  public Yes:any;
  public No:any;
  public save:any;
  public Cancel:any;
  public Write_a_review:any;
  public Seller_Info:any;
  public Seller_Name:any;
  public phone:any;
  public Address:any;
  public Your_Messages:any;
  public Send:any;
  public Product_Informations:any;
  public Product_Bracelet_Type:any;
  public Product_Size:any;
  public Model_Year:any;
  public movementss:any;
  public Date_of_Purchased:any;
  public Status_of_watch:any;
  public Product_Description:any;
  public reference_noss:any;
  public Days_ago:any;
  public no_records_found:any;
  public show_interest:any;
  public Go_Live_Bidding:any;
  public contact_seller:any;
  public Please_enter_your_password_below:any;
  public Continue:any;
  
  

  

  map: any;
  //markers = [];
  location:any;
  lat:any;
  lang:any;
  my_latitude:any;
  my_longitude:any;
  hideMe:boolean=false;
  selectedcurrency:any;
  mycurrency:any;
  send_message:any;
  //product_id1:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public toastCtrl:ToastController,
    public alertCtrl: AlertController,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    private builder: FormBuilder,
    private launchNavigator: LaunchNavigator,
    private callNumber: CallNumber
) {

  this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }

  this.sellercontactfrom = builder.group({
    'message': [null, Validators.required]
  });

    
    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    this.user_id=this.loguser.user_id;
    this.user_type=this.loguser.user_type;
    this.product_id = this.navParams.get('product_id');
    this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    if(this.selectedcurrency){
      this.mycurrency = this.selectedcurrency.selectedcurrency;
      //alert(this.selectedcurrency.selectedcurrency);
    }else{
      this.mycurrency ='KWD';
    }
    this.productsDetails(this.product_id);
   
    
  }


 /*initlocationMap(lat,lang) {
    

    var point = {lat: lat, lng: lang};
   // alert(JSON.stringify(point));
    let divMap = (<HTMLInputElement>document.getElementById('map'));
    this.map = new google.maps.Map(divMap, {
    center: point,
    zoom: 15,
    disableDefaultUI: true,
    draggable: false,
    zoomControl: true
    });

     var marker = new google.maps.Marker({
      map: this.map,
      position: point,
      });
      this.markers.push(marker);

 }*/




  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }



  ionViewDidLoad() {
   
    console.log('ionViewDidLoad DetailsPage');
    
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
         this.reviewss=res.languages.reviews;
         this.Recommend_this_product=res.languages.Recommend_this_product;
         this.Yes=res.languages.Yes;
         this.No = res.languages.No;
         this.save = res.languages.save;
         this.Cancel = res.languages.Cancel;
         this.Write_a_review = res.languages.Write_a_review;

         this.Seller_Info=res.languages.Seller_Info;
         this.Seller_Name=res.languages.Name;
         this.phone = res.languages.phone;
         this.Address = res.languages.Address;
         this.Your_Messages = res.languages.Your_Messages;
         this.Send = res.languages.Send;
         this.Product_Informations=res.languages.Product_Informations;
         this.Product_Bracelet_Type=res.languages.Product_Bracelet_Type;
         this.Product_Size = res.languages.Product_Size;
         this.Model_Year = res.languages.Model_Year;
         this.movementss = res.languages.movement;
         this.Date_of_Purchased = res.languages.Date_of_Purchased;
         this.Status_of_watch=res.languages.Status_of_watch;
         this.Product_Description=res.languages.Product_Description;
         this.reference_noss = res.languages.reference_no;
         this.Days_ago = res.languages.Days_ago;
         this.no_records_found = res.languages.no_records_found;
         this.show_interest = res.languages.show_interest;
         this.Go_Live_Bidding=res.languages.Go_Live_Bidding;
         this.contact_seller=res.languages.contact_seller;
         this.Please_enter_your_password_below = res.languages.Please_enter_your_password_below;
         this.Continue = res.languages.Continue;
         this.send_message=res.languages.send_message;
         
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
   // this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    let serval={
      "product_id":product_id,
      "user_id":this.user_id,
      "currency":this.mycurrency,
    }
    
    this.authService.postData(serval,'ProductsDetails_app').then((result) => {
      this.responseData = result
     //alert(this.responseData.Ack);
     //console.log('productsdetails',this.responseData);
      if( this.responseData.Ack == 1)
      {
        
        loading.dismiss();
        this.ptype =  this.responseData.type;
        this.is_fav= this.responseData.is_fav;
        this.productLists =  this.responseData.productList;
        this.price=this.productLists.price;
        this.brands=this.productLists.brands;
        this.category=this.productLists.category;
        this.gender=this.productLists.gender;
        this.seller_name=this.productLists.seller_name;
        this.product_single_image=this.productLists.product_single_image;
        this.averagerating=this.productLists.averagerating;
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
        this.interest=this.productLists.interest;
        this.sliderimages=this.productLists.image;
        this.reviews=this.responseData.reviews;
        
         //console.log('arunava',this.productLists)


         this.my_latitude=parseFloat(this.responseData.productList.my_latitude);
         this.my_longitude=parseFloat(this.responseData.productList.my_longitude);
         //console.log('splat',this.my_latitude);
        /* if(this.my_latitude && this.interest==1){
          
          
          this.initlocationMap(this.my_latitude,this.my_longitude);
        
         }*/

        
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


interestedEmailToVendor(sellerid,type){


  if(this.user_type== 3){

    const alert = this.alertCtrl.create({
      title: "Sorry!",
      subTitle:"Please login first.",
      buttons: ['OK']
    });
    alert.present();

  }else{

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();
  
  this.loguser =  JSON.parse(localStorage.getItem('userData'));
  let serval={
    "product_id":this.product_id,
    "user_id":this.loguser.user_id,
    "seller_id":sellerid,
    "type":type,
  }
  
  this.authService.postData(serval,'interestedEmailToVendor').then((result) => {
    this.responseData = result
   //alert(this.responseData.Ack);
  // console.log('mailsend',this.responseData);
    if( this.responseData.Ack == 1)
    {
      
      loading.dismiss();
      this.productsDetails(this.product_id);
      this.presentToast('Interest shown successfully.');
      
    }
    else
    {
      loading.dismiss();
      this.presentToast('Something went worng. Please try after some time.');
    }
   
  }, (err) => {
    loading.dismiss();
    this.presentToast('Error occured.');
    console.log(err);
    
  });

  }

}


favourite(sellerid){

  if(this.user_type== 3){

    const alert = this.alertCtrl.create({
      title: "Sorry!",
      subTitle:"Please login first.",
      buttons: ['OK']
    });
    alert.present();

  }else{

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();
  this.loguser =  JSON.parse(localStorage.getItem('userData'));
  let serval={
    "product_id":this.product_id,
    "user_id":this.loguser.user_id,
    "seller_id":sellerid,
  }
  
  this.authService.postData(serval,'addFavoriteProduct').then((result) => {
    this.responseData = result
  
    if( this.responseData.Ack == 1)
    {
      
      this.totallike=this.responseData.totallike;
      this.is_fav=this.responseData.is_fav;
      loading.dismiss();
            
    }
    else
    {
      loading.dismiss();
      this.presentToast('Something went worng. Please try after some time.');
    }
   
  }, (err) => {
    loading.dismiss();
    this.presentToast('Error occured.');
    console.log(err);
    
  });
}
}


gotobid(uid){

  if(this.user_type== 3){

    const alert = this.alertCtrl.create({
      title: "Sorry!",
      subTitle:"Please login first.",
      buttons: ['OK']
    });
    alert.present();

  }else{

  let alert = this.alertCtrl.create({
    title: this.Please_enter_your_password_below,
    inputs: [
      
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: this.Cancel,
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: this.Continue,
        handler: data => {
          if (data.password) {

            this.loguser =  JSON.parse(localStorage.getItem('userData'));
            let serval={
              
              "userid":this.loguser.user_id,
              "password":data.password,
            }
            
            this.authService.postData(serval,'checkpassword').then((result) => {
              this.responseData = result
            
              if( this.responseData.Ack == 1)
              {
                this.navCtrl.push('LiveAuctionPage',{"product_id":this.product_id}); 
              }
              else
              {
                this.presentToast('Plsease enter correct password.');
              }
             
            }, (err) => {
              
              this.presentToast('Error occured.');
              console.log(err);
              
            });
          }

           else {
            // invalid login
            return false;
          }
        }
      }
    ]
  });
  alert.present();

}
}



show()
  {
    
    this.isShow =true;
    //console.log(prodId);
    //this.product=prodId
  }

  hide() {
    this.isShow =false;
  }

  submit(){

    if(this.user_type== 3){

      const alert = this.alertCtrl.create({
        title: "Sorry!",
        subTitle:"Please login first.",
        buttons: ['OK']
      });
      alert.present();
  
    }else{
      
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    let serval={
      "productid":this.product_id,
      "userid":this.loguser.user_id,
      "review":this.review,
      "rating":this.rate,
      "recomend":this.recomend,
    }
    
    this.authService.postData(serval,'addreview').then((result) => {
      this.responseData = result
     
      if( this.responseData.Ack == 1)
      {
        this.isShow =false;
        loading.dismiss();
        this.productsDetails(this.product_id);
        this.presentToast(this.responseData.msg);
        
      }
      else
      {
        this.isShow =false;
        loading.dismiss();
        this.presentToast('Something went worng. Please try after some time.');
      }
     
    }, (err) => {
      this.isShow =false;
      loading.dismiss();
      this.presentToast('Error occured.');
      console.log(err);
      
    });
  }
  }



  ishide() {
    this.hideMe = !this.hideMe;
  }

addmessage(formData) {

this.loguser =  JSON.parse(localStorage.getItem('userData'));

formData['from_id'] = this.loguser.user_id,
formData['to_id'] = this.seller_id;
formData['product_id'] = this.product_id;
console.log('arunava',formData);
this.authService.addmessage(formData).subscribe(res => {
 if (res.Ack == 1) {
  this.hideMe = false;
    const alert = this.alertCtrl.create({
      title: "Success!",
      subTitle:"Your Message Sent Successfully",
      buttons: ['OK']
    });
    alert.present();
  } 
  else {
    this.hideMe = false;
    const alert = this.alertCtrl.create({
      
      title: "Failed!",
      subTitle:"Message sent failed",
      buttons: ['OK']
    });
    alert.present();
  }
}, err => {
  const alert = this.alertCtrl.create({
    title: "Error!",
    subTitle:"Something went wrong",
    buttons: ['OK']
  });
  alert.present();
  console.log(err);
  
});

}

navigateDrivingLocation(){


  let loading = this.loadingCtrl.create({
    content: 'Fetching data...'
  });
  loading.present();
  this.geolocation.getCurrentPosition().then((resp) => {
    console.log('splocation',resp);
    this.lat = resp.coords.latitude;
    this.lang = resp.coords.longitude;
   
  if(this.lat){

    loading.dismiss();
  
  let options: LaunchNavigatorOptions = {
   app: this.launchNavigator.APP.GOOGLE_MAPS,
            start:[this.lat,this.lang]
     };
 this.launchNavigator.navigate(this.seller_address,options)
 .then(success =>{
   console.log(success);
 },error=>{
   console.log(error);
 })
}
});
}

call(number){
  this.callNumber.callNumber(number, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
}


}
