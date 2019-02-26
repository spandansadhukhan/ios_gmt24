import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import { pointerCoord } from 'ionic-angular/util/dom';
import {Storage} from '@ionic/storage'

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  public responseData:any;
  id: any;
  wishlist:any;
  selectedcurrency :any;
  mycurrency:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public My_Wishlist:any;
  public Remove:any;
  public no_records_found:any;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthServiceProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl:ToastController,
) {
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
    console.log('ionViewDidLoad WishlistPage');
    this.ChangeToUserLaguage(this.selectedlanguage);
    this.wishlists();
    
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
         this.My_Wishlist=res.languages.My_Wishlist;
         this.Remove=res.languages.Remove;
         this.no_records_found=res.languages.no_records_found;
         
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

   private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

 wishlists(){

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();

  this.storage.get('uid').then(val => {
    this.id = val;
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
  let serval={
    "user_id":this.id,
    "currency":this.mycurrency,
   };
  this.authService.postData(serval,'myFavoriteProduct').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
      loading.dismiss();
      this.wishlist =  this.responseData.favouriteProductList;
      //console.log(this.wishlist);
      
    }else
    {
      loading.dismiss();
      this.wishlist = '';
    }
   
  }, (err) => {
    loading.dismiss();
    this.presentToast('Error occured.');
    console.log(err);
 
});

});
 }



productdetails(product_id){
    
  this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
}



}