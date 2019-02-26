import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import{Storage} from '@ionic/storage'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import {FormBuilder,FormControl,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { IonicApp } from 'ionic-angular/components/app/app-root';
/**
 * Generated class for the AdminmessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminmessages',
  templateUrl: 'adminmessages.html',
})
export class AdminmessagesPage {
  toId: any;
  fromId:any;
  productId:any;
  responseData:any;
  responseDataMsg:any;
messageDetails:any;
productName:any;
productImage:any;
formGroup:FormGroup;
dataSet:any;
txtInput:any;
userMessage:any;
textEntered:any;
loguser:any;
user_id:any;

public language:any;
  public selectedlanguage:any;
  public languages:any;
  public Sends:any;
  public MessageDetails:any;
 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl:ToastController,) {

      this.languages = JSON.parse(localStorage.getItem('language'));
      //console.log('Arunavalang',this.languages)
      if(this.languages){
        this.selectedlanguage = this.languages.language;
      }else{
        this.selectedlanguage ='1';
      } 


    this.loguser = JSON.parse(localStorage.getItem('userData'));
    this.user_id = this.loguser.user_id;
    this.toId =  this.user_id;
    this.fromId =  this.navParams.get('from_id');
    this.productId =  this.navParams.get('product_id');


    this.formGroup=new FormGroup ({
      message: new FormControl ('',Validators.required)
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
    this.messagedetails();
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
         this.MessageDetails=res.languages.MessageDetails;
         this.Sends=res.languages.Send;
        
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }


 messagedetails(){

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();

  this.dataSet=
{
  "to_id":this.toId,
  "from_id":0,
  "product_id":this.productId

};

this.authService.postData(this.dataSet,'getfullAdminMessages').then((result) => {
  this.responseData = result
  console.log ( this.responseData)

  if( this.responseData.Ack == 1)
  {
    loading.dismiss();
    this.messageDetails =  this.responseData.fillmessage;
    console.log(this.messageDetails);
    this.productName=this.responseData.product_name
    this.productImage=this.responseData.product_image
    
  }else
  {
    loading.dismiss();
    this.messageDetails = '';
  }
 
}, (err) => {
  loading.dismiss();
  this.presentToast('Error occured.');
  console.log(err);
});

 }



 send(data)
 {
   if(this.toId==this.user_id){

     data.to_id=0;
     data.from_id=this.toId;
   }else{
     data.to_id=this.toId;
     data.from_id=0;
   }
   
   data.product_id=this.productId;

   //console.log (data)
 let loading = this.loadingCtrl.create({
   content: 'Please Wait...'
 });
 loading.present();
 this.authService.postData(data,'adminaddmessage').then((result) => {

 this.responseDataMsg = result

 if( this.responseDataMsg.Ack == 1)
 {
   loading.dismiss();
   this.textEntered==1;
   data.message=this.txtInput
   //console.log(this.formGroup.value.message);
   this.formGroup.value.message=this.userMessage;
   //console.log (this.userMessage)
   this.messagedetails();
   this.formGroup.reset();
   
 }else
 {
   loading.dismiss();
   this.messageDetails = '';
 }

}, (err) => {
 loading.dismiss();
 this.presentToast('Error occured.');
 console.log(err);

});
 }

}
