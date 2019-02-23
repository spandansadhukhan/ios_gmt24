import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CalendarComponentOptions,DayConfig ,CalendarResult} from 'ion2-calendar'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SendforauctionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendforauction',
  templateUrl: 'sendforauction.html',
})
export class SendforauctionPage {

  pForm: FormGroup;
  date:any;
  month:any;
  year:any;
  fulldate:any;
  responseData:any;
  timelists:any;
  product_id:any;
  type: 'string';
  // optionsMulti: CalendarComponentOptions = {
  //   pickMode: 'multi',
    
  // };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,) {

      this.pForm = fb.group({
        
        'preferred_date': ["",""],
        "time_slot_id" : ["",""],
        'price': [null, Validators.required],
        
      });

      this.product_id=this.navParams.get('product_id');
      //alert(this.product_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendforauctionPage');
  }


  getauctiontime(date){

    this.date=new Date(date).getDate();
    this.month=new Date(date).getMonth()+1;
    this.year=new Date(date).getFullYear();
    this.fulldate=this.year+'-'+this.month+'-'+this.date;
  
     let serval={
       "getdate": this.fulldate
      };
     this.authService.postData(serval,'getTimeslot_app').then((result) => {
       this.responseData = result
   
       if( this.responseData.Ack == 1)
       {
         this.timelists =  this.responseData.time;
       }
       else
       {
        
         this.timelists = '';
       }
      
     }, (err) => {
       
       console.log(err);
       
     });
   
   }

   onSubmit(formData){


    if (!this.pForm.valid) {
  
      const alert = this.alertCtrl.create({
        title: 'Auction Add Failed!',
        subTitle: "Please fill all the * fields.",
        buttons: ['OK']
      });
      alert.present();
    
    }else if(formData['preferred_date']==""){
      const alert = this.alertCtrl.create({
        title: 'Required!',
        subTitle: 'Please select action date and time!',
        buttons: ['OK']
      });
      alert.present();
  
    }else{
     
      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();

      formData['product_id']=this.product_id;
      console.log('spandanproduct',formData);
     this.authService.sendauctionadd(formData).subscribe(res=>{
      
       if(res.Ack==1){
        loading.dismiss();
         const alert = this.alertCtrl.create({
           title: "Success!",
           subTitle:res.msg,
           buttons: ['OK']
         });
        alert.present();
         this.navCtrl.push('MyauctionPage');
       }else{
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
      alert.present();
       }
      },err=>{
        loading.dismiss();
       console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: "Something went wrong.",
          buttons: ['OK']
        });
        alert.present();
     });
      
  }
}

}
