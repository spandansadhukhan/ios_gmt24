import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the VerifyOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-otp',
  templateUrl: 'verify-otp.html',
})
export class VerifyOtpPage {

  otpForm: FormGroup;
  mobile:any;
  user_id:any;
  resend:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public form: FormBuilder) {

    this.mobile=this.navParams.get('mobile');
    this.user_id=this.navParams.get('userid');
    
    this.resend =this.navParams.get('resend');
      //alert(this.resend);
      if(this.resend== 1){

        let loading = this.loadingCtrl.create({
          content: 'Please Wait...'
        });
        loading.present(); 
     this.authService.resendotp({'user_id':this.user_id,'mobile_no':this.mobile}).subscribe(res=>{
       if(res.smsstatus==1){
        loading.dismiss();
        console.log(res);
      //    const alert = this.alertCtrl.create({
      //     title: 'Success!',
      //      subTitle: "Otp send to your mobile no.",
      //      buttons: ['OK']
      //    });
      //  alert.present();
       
       }else{

        loading.dismiss();
        console.log(res);
         const alert = this.alertCtrl.create({
           title: 'Error!',
           subTitle: "Some thing went wrong. Please try again.",
           buttons: ['OK']
         });
       alert.present();

       }
      },err=>{
        loading.dismiss();
       //console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });

      }


      this.otpForm = form.group({

        'mobile': [null, null],
        'otp': [null, Validators.required],
        
      });

      this.otpForm.controls['mobile'].setValue(this.mobile);

  }




  onSubmit(formData) {
    
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();

    if (!this.otpForm.valid) {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Failed!',
        subTitle: "Please type otp.",
        buttons: ['OK']
      });
      alert.present();
    }else{
    
    formData.user_id=this.user_id;
     this.authService.otpverify(formData).subscribe(res=>{
       if(res.Ack==1){
        loading.dismiss();
        console.log(res);
         const alert = this.alertCtrl.create({
          title: 'Success!',
           subTitle: "Mobile no verified successfully.",
           buttons: ['OK']
         });
       alert.present();
       this.navCtrl.push('LoginnewPage');
       }else{

        loading.dismiss();
        console.log(res);
         const alert = this.alertCtrl.create({
           title: 'Error!',
           subTitle: "Please Check Your Mobile Number Along With Your Country .",
           buttons: ['OK']
         });
       alert.present();

       }
      },err=>{
        loading.dismiss();
       //console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });
      
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyOtpPage');
    
  }

}
