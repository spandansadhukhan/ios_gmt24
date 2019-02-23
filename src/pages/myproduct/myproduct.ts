import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import {MyApp} from '../../app/app.component';
/**
 * Generated class for the MyproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myproduct',
  templateUrl: 'myproduct.html',
})
export class MyproductPage {

  public id:any;
  public responseData:any;
  public productlists:any;
  public loguser:any;
  public utype:any;
  public msg:any;
  public selectedcurrency:any;
  public mycurrency:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public my_product:any;
  public Awaiting_Admin_Approval:any;
  public pay_now:any;
  public mark_as_top:any;
  public Save_Changes:any;
  public mark_as_sold:any;
  public sold:any;
  public delete:any;
  public send_for_auction:any;
  public Expired_On:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public myApp:MyApp,
    public alertCtrl: AlertController) {

      this.languages = JSON.parse(localStorage.getItem('language'));
      //console.log('Arunavalang',this.languages)
      if(this.languages){
        this.selectedlanguage = this.languages.language;
      }else{
        this.selectedlanguage ='1';
      }

      this.loguser = JSON.parse(localStorage.getItem('userData'));
      this.utype=this.loguser.user_type;
      this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
      if(this.selectedcurrency){
        this.mycurrency = this.selectedcurrency.selectedcurrency;
      }else{
        this.mycurrency ='KWD';
      }
     // alert(this.selectedcurrency.selectedcurrency);
     // console.log('spandancurrency',this.selectedcurrency.selectedcurrency);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyproductPage');
    this.ChangeToUserLaguage(this.selectedlanguage);  
    this.myproductList();
    
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
         this.my_product=res.languages.my_product;
         this.Awaiting_Admin_Approval=res.languages.Awaiting_Admin_Approval;
         this.pay_now=res.languages.pay_now;
         this.mark_as_top = res.languages.mark_as_top;
         this.Save_Changes = res.languages.Save_Changes;
         this.mark_as_sold = res.languages.mark_as_sold;
         this.sold = res.languages.sold;

         this.delete = res.languages.delete;
         this.send_for_auction = res.languages.send_for_auction;
         this.Expired_On= res.languages.Expired_On;
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }
  myproductList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.storage.get('uid').then(val => {
      this.id = val;
      //alert(this.mycurrency);
    let serval={
      "user_id":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'listmyProducts').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.productlists =  this.responseData.productList;
        
      }
      else
      {
        loading.dismiss();
        this.productlists = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  });
}

deleteproductpermanently(pid)
  {
   // alert(id)
   
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure to delete product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          cssClass:'icon-color',
          handler: data => {
            
            let loading = this.loadingCtrl.create({
              content: 'Please Wait...'
            });
            loading.present();
            this.storage.get('uid').then(val => {
              this.id = val;
            let serval={
              "product_id": pid,
              "user_id" : this.id
             };
             
            this.authService.postData(serval,'deleteProductpermanently').then((result) => {
              this.responseData = result
         
              if( this.responseData.AcK == 1)
              {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: this.responseData.msg,
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push('MyproductPage');
              }
              else
              {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: this.responseData.msg,
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push('MyproductPage');
              }
             
            }, (err) => {
              loading.dismiss();
              console.log(err);
              
            });
        
          });
            
          }
        }
      ]
    });
  
    alert.present();
    //alert(id)
  }

deleteproduct(pid)
  {
   // alert(id)
   
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure to delete product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          cssClass:'icon-color',
          handler: data => {
            
            let loading = this.loadingCtrl.create({
              content: 'Please Wait...'
            });
            loading.present();
            this.storage.get('uid').then(val => {
              this.id = val;
            let serval={
              "product_id": pid,
              "user_id" : this.id
             };
             
            this.authService.postData(serval,'deleteProduct').then((result) => {
              this.responseData = result
         
              if( this.responseData.AcK == 1)
              {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: this.responseData.msg,
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push('MyproductPage');
              }
              else
              {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: this.responseData.msg,
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push('MyproductPage');
              }
             
            }, (err) => {
              loading.dismiss();
              console.log(err);
              
            });
        
          });
            
          }
        }
      ]
    });
  
    alert.present();
    //alert(id)
  }



  marksoldproduct(pid)
  {
   // alert(id)
   
    let alert = this.alertCtrl.create({
      title: 'Mark sold',
      message: 'Are you sure to mark as sold?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'icon-color',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          cssClass:'icon-color',
          handler: data => {
            
            let loading = this.loadingCtrl.create({
              content: 'Please Wait...'
            });
            loading.present();
             
            let serval={
              "id": pid,
             };
             
            this.authService.postData(serval,'markProduct').then((result) => {
              this.responseData = result
         
              if( this.responseData.AcK == 1)
              {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: this.responseData.msg,
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push('MyproductPage');
              }
              else
              {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: this.responseData.msg,
                  buttons: ['OK']
                });
                alert.present();
                this.navCtrl.push('MyproductPage');
              }
             
            }, (err) => {
              loading.dismiss();
              console.log(err);
              
            });
        
          
            
          }
        }
      ]
    });
  
    alert.present();
    //alert(id)
  }



  productdetails(product_id){
    
      this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
    }


    sendforauction(product_id){

      this.navCtrl.push('SendforauctionPage',{"product_id":product_id}); 
    }

    pay(pid){

      this.navCtrl.push('CusdetailsproductuploadPage',{'pid':pid});
    }

    paytop(pid){

      this.navCtrl.push('CusdetailsproducttopPage',{'pid':pid});
    }

}
