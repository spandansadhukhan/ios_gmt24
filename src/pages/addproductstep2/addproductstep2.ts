import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the Addproductstep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproductstep2',
  templateUrl: 'addproductstep2.html',
})
export class Addproductstep2Page {

  public id:any;
  public responseData:any;
  public countrylists:any;
  public statelists:any;
  public citylists:any;
  public statuslists:any;
  public loguser;
  pForm: FormGroup;
  movementlist:any;
  phonecode:any;
  isShow:boolean=false;
  simg:any;
  sname:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;

  public add_product:any;
  public auction:any;
  public Upload_Type:any;
  public product:any;
  public this_field_is_required:any;
  public countries:any;
  public Owner_Number:any;

  public status_of_the_watch:any;
  public date_of_purchased:any;
  public reference_code:any;
  public gender:any;
  public unisex:any;
  public female:any;
  public male:any;
  public please_choose_a_state:any;
  public Currency:any;
  public Cancel:any;
  public please_choose_a_country:any;
  public please_choose_your_gender:any;
  public movement:any;
  public state:any;
  public Status:any;
  public next:any;
  public utype:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private builder: FormBuilder,
    private fb: FormBuilder,
    public alertCtrl: AlertController) {

      this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }


      this.pForm = fb.group({
        'movement': [null, Validators.required],
        'gender': [null, Validators.required],
        'reference': [null, Validators.required],
        //'status':[null, Validators.required],
        'owner_number': [null, Validators.required],
        'country': [null, Validators.required],
        'state': [null, Validators.required],
        'city': [null, ""],
        'date_of_purchase': ["",""],
        
      });
      this.storage.ready().then(()=>{
        this.storage.get('uid').then(val => {
          console.log(val);
          if(val){
            this.authService.getdetails({ user_id: val }).subscribe(res => {
      this.pForm.controls['country'].setValue(res.UserDetails.country);
      this.pForm.controls['state'].setValue(res.UserDetails.state);
      this.pForm.controls['city'].setValue(res.UserDetails.city);
      this.pForm.controls['owner_number'].setValue(res.UserDetails.phone);
      this.stateList(res.UserDetails.country);
      this.cityList(res.UserDetails.state);  
            });
          };
        });
        });

        this.sname="New";


      this.loguser = JSON.parse(localStorage.getItem('userData'));
      this.utype=this.loguser.user_type;
//alert(this.utype);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addproductstep2Page');
    this.ChangeToUserLaguage(this.selectedlanguage);
    this.countryList();
    this.statusList();
    this.movementList();
    //this.loguser =  JSON.parse(localStorage.getItem('productData'));
   // alert(this.loguser.price);
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
         this.add_product=res.languages.add_product;
         this.auction=res.languages.auction;
         this.Upload_Type=res.languages.Upload_Type;
         this.product = res.languages.product;
         this.countries =  res.languages.country;
         this.Status= res.languages.Status ;
         this.this_field_is_required= res.languages.this_field_is_required;
         this.status_of_the_watch = res.languages.status_of_the_watch;
         this.date_of_purchased = res.languages.date_of_purchased;
         this.reference_code = res.languages.reference_code;
         this.gender = res.languages.gender;
         this.female = res.languages.female;
         this.unisex= res.languages.unisex;
         this.male = res.languages.male;
         this.please_choose_a_state = res.languages.please_choose_a_state;
         this.Currency = res.languages.Currency;
         this.Cancel = res.languages.Cancel;
         this.please_choose_a_country= res.languages.please_choose_a_country;
         this.please_choose_your_gender = res.languages.please_choose_your_gender;
         this.movement = res.languages.movement;
         this.state = res.languages.state;
         this.Owner_Number = res.languages.Owner_Number;
         this.next = res.languages.next;
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  countryList(){
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listcountry').then((result) => {
      this.responseData = result
  
      if( this.responseData.Ack == 1)
      {
       
        this.countrylists =  this.responseData.countrylist;
        
      }
      else
      {
        this.countrylists = '';
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  });
}


stateList(cid){
   
 //alert(cid);
    
  let serval={
    "c_id": cid,
   };
  this.authService.postData(serval,'liststate').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.statelists =  this.responseData.statelist;
      this.phonecode=this.responseData.phonecode;
    }
    else
    {
     
      this.statelists = '';
    }
   
  }, (err) => {
    
    console.log(err);
    
  });

}


cityList(ctid){
   
  //alert(cid);
     
   let serval={
     "s_id": ctid,
    };
   this.authService.postData(serval,'listcity').then((result) => {
     this.responseData = result
 
     if( this.responseData.Ack == 1)
     {
      
       this.citylists =  this.responseData.citylist;
       
     }
     else
     {
      
       this.citylists = '';
     }
    
   }, (err) => {
     
     console.log(err);
     
   });
 
 }

 statusList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'liststatus').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.statuslists =  this.responseData.statuslist;
      
    }
    else
    {
      this.statuslists = '';

    }
   
  }, (err) => {
    
    console.log(err);
    
  });
});
}

movementList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'listmovement').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.movementlist =  this.responseData.movementlist;
      
    }
    else
    {
      this.movementlist = '';
    }
   
  }, (err) => {
    
    console.log(err);
    
  });
});
}




onSubmit(formData){
  if (!this.pForm.valid) {
    const alert = this.alertCtrl.create({
      title: 'Product Add Failed!',
      subTitle: "Please fill all the * fields.",
      buttons: ['OK']
    });
    alert.present();
  }else{
    this.storage.ready().then(() => {

      formData.status = this.sname;
      localStorage.setItem('productData2', JSON.stringify(formData));
      console.log('spform2',formData);
      this.navCtrl.push('Addproductstep3Page');
    });
  }
 }
 

 show()
 {
   
   this.isShow =true;
  
 }

 hide() {
   this.isShow =false;
 }


 selectstatus(sname,simg){
    this.isShow =false;
    this.sname=sname;
    this.simg=simg;
 }



}
