import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

import { MenuController } from 'ionic-angular';
//import {MyApp} from '../../app/app.component';
import { Events } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
//import { GooglePlus } from '@ionic-native/google-plus';
@IonicPage()
@Component({
  selector: 'page-loginnew',
  templateUrl: 'loginnew.html',
})
export class LoginnewPage {

public loguser:any;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public device_type: AbstractControl;
  public device_token_id: AbstractControl;


  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  users: any;
  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public events: Events,
    private fb: Facebook,
    //private googlePlus: GooglePlus,
    //private myApp:MyApp
  ) {

    events.publish('hideFooter', { isHidden: true});
    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  

  ionViewDidLoad() {
  
    this.menu.enable(false, 'loggedOutMenu');
    console.log('ionViewDidLoad LoginnewPage');

    }



  forgetpass(){
   
    this.navCtrl.push("ForgetpassPage");
  }

  



  loginNow(formData) { 

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    formData['device_token_id'] = localStorage.getItem('TOKEN');
    formData['device_type']='android';
    
    this.authService.login(formData).subscribe(res => {
      //console.log('spandan',res);
      if(res.Ack==1){
        loading.dismiss();
        this.storage.ready().then(() => {
          localStorage.setItem('userData', JSON.stringify(res.UserDetails));
           //console.log("USERDATA", JSON.stringify(res.UserDetails));
                this.storage.set('uid', res.UserDetails['user_id']).then(() => {
                this.navCtrl.setRoot('HomePage');
              });
        });
      
    }else if(res.Ack==4){

      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: res.msg,
        buttons: ['OK']
      });
      alert.present(); 
      this.navCtrl.push('VerifyOtpPage',{'mobile':res.mobilenoforlogin,'userid':res.userid,'resend': '1'});
    }
    else{
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: res.msg,
        buttons: ['OK']
      });
      alert.present(); 
    }
    }, err => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Auth Failed!',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  onSignup() {
    this.navCtrl.setRoot('SignupPage');
  }

  guestlogin(){

    localStorage.setItem('userData', JSON.stringify({"fname":"Guest","lname":"User","user_type":"3"}));
    this.navCtrl.setRoot('HomePage');

  }


  facebookSignIn() {
    this.fb.login(['public_profile', 'email'])
      .then(res => {
        console.log("FBDATA",res);
        if(res.status === "connected") {
          //this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
         // this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log("FBDATA",res);
        this.users = res;
        
     let param={
      "id": this.users.id,
      "email":this.users.email,
      "name": this.users.name,
      "device_type": 'android',
      "device_token_id": localStorage.getItem('TOKEN'),
       
     };
     console.log("DATATATTATATAT",param);
       
        this.authService.facebooklogin(param).subscribe((res) => { //console.log(result);
         //this.detailsTReponse = res;
         console.log("FBRESULT",res);
         if(res.Ack== 1)
         {
       
          localStorage.setItem('userData',JSON.stringify(res.UserDetails));
          //this.navCtrl.push('HomePage')
          this.storage.set('uid', res.UserDetails['user_id']).then(() => {
            this.navCtrl.setRoot('HomePage');
          });
         }
         else{
          
          let alert = this.alertCtrl.create({
            title: "Something went wrong.",
                   buttons: ['ok']
          });
          alert.present(); 
          //this.formGroup.reset();
           
         }
          
       })
  
      })
      
  }


  /*googleplus() {
    //alert();
    this.googlePlus.login({})
      .then(res => {
        console.log("GOOGLEPLUSDATA",res);
        this.email = res.email;
      })
      .catch(err => console.error(err));
  }*/





}
