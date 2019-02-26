
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  changeForm: FormGroup;
  passwordmatch: boolean = false;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public new_password:any;
  public retype_password:any;
  public password_match_error_mobile:any;
  public password_match_error_mobile_1:any;
  public Save_Changes:any;
  public password_match_error_mobile_2:any;
  public change_password:any;
  old_password:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
   
    this.changeForm = builder.group({
     'old_password': [null, Validators.required],
      'password': [null, Validators.required],
      'con_password': [null, Validators.required]
    });

    this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
  }

  public checkpassword(conpass,frmval)
  {
    //console.log(frmval.password);
   // console.log(conpass);
    if(frmval.password == conpass)
    {
     this.passwordmatch = true;
    }
    else{
      this.passwordmatch = false;
    }
  }

  changepass(formData) {
    this.storage.get('uid').then(val => {
    formData['user_id'] = val;
    this.authService.changepass(formData).subscribe(res => {
     if (res.Ack == 1) {
        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
        alert.present();
      } 
      else {

        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
        alert.present();
      }
    }, err => {
      console.log(err);
    });
  });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
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
         this.old_password=res.languages.old_password;
         this.new_password=res.languages.new_password;
         this.retype_password=res.languages.retype_password;
         this.password_match_error_mobile=res.languages.password_match_error_mobile;
         this.password_match_error_mobile_1 = res.languages.password_match_error_mobile_1;
         this.Save_Changes = res.languages.Save_Changes;
         this.password_match_error_mobile_2 = res.languages.password_match_error_mobile_2;
         this.change_password = res.languages.change_password;
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }
}
