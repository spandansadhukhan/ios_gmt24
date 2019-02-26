import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

import { MenuController, Platform } from 'ionic-angular';
//import {MyApp} from '../../app/app.component';
import { Events } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-loginnew',
  templateUrl: 'loginnew.html',
})
export class LoginnewPage {
  FB_APP_ID: number = 330093867579675;
  public loguser: any;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public device_type: AbstractControl;
  public device_token_id: AbstractControl;

  device_platform: any;
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
    private googlePlus: GooglePlus,
    public plt: Platform
    //private googlePlus: GooglePlus,
    //private myApp:MyApp
  ) {

    events.publish('hideFooter', { isHidden: true });
    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.plt.ready().then(() => {
      this.fb.browserInit(this.FB_APP_ID, "v2.8");
    });
    if (this.plt.is('ios')) {
      this.device_platform = 'iOS';
    } else if (this.plt.is('android')) {
      this.device_platform = 'android';
    } else {
      this.device_platform = 'web';
    }
  }



  ionViewDidLoad() {

    this.menu.enable(false, 'loggedOutMenu');
    console.log('ionViewDidLoad LoginnewPage');

  }



  forgetpass() {

    this.navCtrl.push("ForgetpassPage");
  }





  loginNow(formData) {

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    formData['device_token_id'] = localStorage.getItem('TOKEN');
    formData['device_type'] = 'android';

    this.authService.login(formData).subscribe(res => {
      //console.log('spandan',res);
      if (res.Ack == 1) {
        loading.dismiss();
        this.storage.ready().then(() => {
          localStorage.setItem('userData', JSON.stringify(res.UserDetails));
          //console.log("USERDATA", JSON.stringify(res.UserDetails));
          this.storage.set('uid', res.UserDetails['user_id']).then(() => {
            this.navCtrl.setRoot('HomePage');
          });
        });

      } else if (res.Ack == 4) {

        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: res.msg,
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push('VerifyOtpPage', { 'mobile': res.mobilenoforlogin, 'userid': res.userid, 'resend': '1' });
      }
      else {
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

  guestlogin() {

    localStorage.setItem('userData', JSON.stringify({ "fname": "Guest", "lname": "User", "user_type": "3" }));
    this.navCtrl.setRoot('HomePage');

  }



  facebookSignIn() {
    let permissions = new Array<string>();
    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];
    let that = this;
    this.fb.login(permissions)
      .then((response) => {
        console.log(response);
        let userId = response.authResponse.userID;
        let params = new Array<string>();

        //Getting name and gender properties
        this.fb.api("/me?fields=id,email,name,picture,gender", params)
          .then((user) => {
            //now we have the users info
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";

            console.log(JSON.stringify(user));

            let param = {
              "id": user.id,
              "email": user.email,
              "name": user.name,
              "device_type": that.device_platform,
              "device_token_id": localStorage.getItem('TOKEN'),
              "picture": user.picture
            };
            console.log("FB Object", JSON.stringify(param));

            that.saveUserDetail(param, 'fblogin');
          })
      }, (error) => {
        // alert(error);
        console.log(error);
        let alert = this.alertCtrl.create({
          title: "Something went wrong.",
          buttons: ['ok']
        });
        alert.present();
      });

    // this.fb.login(['public_profile', 'email'])
    //   .then(res => {
    //     console.log("FBDATA", res);
    //     if (res.status === "connected") {
    //       //this.isLoggedIn = true;
    //       this.getUserDetail(res.authResponse.userID);
    //     } else {
    //       // this.isLoggedIn = false;
    //     }
    //   })
    //   .catch(e => console.log('Error logging into Facebook', e));
  }

  saveUserDetail(param, type) {
    // this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
    //   .then(res => {
    //     console.log("FBDATA", res);
    //     this.users = res;
    //
    //     let param = {
    //       "id": this.users.id,
    //       "email": this.users.email,
    //       "name": this.users.name,
    //       "device_type": 'android',
    //       "device_token_id": localStorage.getItem('TOKEN'),
    //
    //     };
    this.authService.socialLogin(param, type).subscribe((res) => {
      console.log("RESULT", type, res);
      if (res.Ack == 1) {
        localStorage.setItem('userData', JSON.stringify(res.UserDetails));
        localStorage.setItem(type, 'true');
        this.storage.set('uid', res.UserDetails['user_id']).then(() => {
          this.navCtrl.setRoot('HomePage');
        });
      } else {
        let alert = this.alertCtrl.create({
          title: "Something went wrong.",
          buttons: ['ok']
        });
        alert.present();
      }
    }, err => {
      const alert = this.alertCtrl.create({
        title: 'Error while saving!',
        buttons: ['OK']
      });
      alert.present();
    });
  }


  // googleplus() {
  //   //alert();
  //   this.googlePlus.login({})
  //     .then(res => {
  //       console.log("GOOGLEPLUSDATA", res);
  //       this.email = res.email;
  //     })
  //     .catch(err => console.error(err));
  // }

  doGoogleLogin() {
    let that = this;

    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '127816771134-q36t9u8fjq47hmab1ocvih9duovu47u8.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
      .then((user) => {

        let param = {
          "id": user.userId,
          "created_email": user.email,
          "displayName": user.displayName,
          "device_type": that.device_platform,
          "device_token_id": localStorage.getItem('TOKEN'),
          "picture": user.imageUrl
        };

        console.log("Gmail Object", JSON.stringify(param));

        that.saveUserDetail(param, 'googlelogin');

      }, (error) => {
        console.log('gmail login error', error);
        let alert = this.alertCtrl.create({
          title: "Something went wrong.",
          buttons: ['ok']
        });
        alert.present();
      });
  }

}
