import { Component,ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { Calendar } from '@ionic-native/calendar';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import * as moment from 'moment';
import * as _ from "lodash";
import { months } from 'moment';
import { CalendarComponentOptions,DayConfig ,CalendarResult} from 'ion2-calendar'
/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  public id:any;
  public responseData:any;
  
  public currencylists:any;
  public brandlists:any;
  public subcategorylists:any;
  public yearlists:any;
  pForm: FormGroup;
  public uploadtypeid:any;

  public timelists:any;
  public braceletlists: any;
 showCalendar:boolean=false;
 
  public time_slot_id:any;
 
  date: any = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  // monthNames: string[];
  public monthNames=[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  isSelected: boolean=false;
  brandid:any; 
  days=[];
  month:any;
  year:any;
  fulldate:any;
  selectOptions:any;
  isShow:boolean=false;
  curcode:any;
  curimg:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public add_product:any;
  public auction:any;
  public Upload_Type:any;
  public product:any;
  public this_field_is_required:any;
  public please_select:any;
  public brands:any;
  public other:any;
  public category:any;
  public other_brand_name:any;
  public other_category_name:any;
  public Bracelet_Type:any;
  public Model_Year:any;
  public Currency:any;
  public Cancel:any;
  public auction_date:any;
  public auction_Timing:any;
  public description:any;
  public Price:any;
  public next:any;
  

  public _daysConfig: DayConfig[] = [];
      // for (let i = 0; i < 31; i++) {
      //   _daysConfig.push({
      //     date: new Date(2018, 0, i + 1),
      //     subTitle: `$${i + 1}`
      //   })
      // }
      
      type: 'string';
      optionsMulti: CalendarComponentOptions = {
        pickMode: 'multi',
        
      };

  
     



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    // private calendar: Calendar,
    ) {

      this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }

      this._daysConfig;
      for (let i = 0; i < 31; i++) {
        this._daysConfig.push({
          date: new Date(2018, 0, i + 1),
          subTitle: `$${i + 1}`,
          marked : true
        })
      }
      this.optionsMulti= {"daysConfig" : this._daysConfig};
      console.log(this.optionsMulti);
      this.monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      this.getDaysOfMonth();
      //this.days=['04','06'];
      
      this.pForm = fb.group({
        'type': [null, Validators.required],
        'brand': [null, Validators.required],
        'cat_id': ["", ""],
        'breslet_type':[null, Validators.required],
        'model_year': [null, Validators.required],
        //'currency': [null, Validators.required],
        'preferred_date': ["",""],
        "time_slot_id" : ["",""],
        'description': ["",""],
        'price': [null, Validators.required],
        'otherbrand': ["", ""],
        'othercategory': ["", ""],
        
      });

      this.curcode='KWD';
      this.curimg='kwd.jpg';
  }

  getauctiontime(date){

    this.date=new Date(date).getDate();
    this.month=new Date(date).getMonth()+1;
    this.year=new Date(date).getFullYear();
    this.fulldate=this.year+'-'+this.month+'-'+this.date;
   // alert(this.fulldate);
       
     let serval={
       //"getdate": date.year+'-'+date.month+'-'+date.day,
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

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
    
    this.currencyList();
    this.brandList();
    this.yearList();
    this.braceletList()
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
         this.add_product=res.languages.add_product;
         this.auction=res.languages.auction;
         this.Upload_Type=res.languages.Upload_Type;
         this.product = res.languages.product;
         this.this_field_is_required= res.languages.this_field_is_required;
         this.please_select = res.languages.please_select;
         this.brands = res.languages.brands;
         this.other = res.languages.other;
         this.category = res.languages.category;
         this.other_brand_name = res.languages.other_brand_name;
         this.other_category_name= res.languages.other_category_name;
         this.Bracelet_Type = res.languages.Bracelet_Type;
         this.Model_Year = res.languages.Model_Year;
         this.Currency = res.languages.Currency;
         this.Cancel = res.languages.Cancel;
         this.auction_date= res.languages.auction_date;
         this.auction_Timing = res.languages.auction_Timing;
         this.description = res.languages.description;
         this.Price = res.languages.Price;
         this.next = res.languages.next;
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }


  uploadtype(typeid){
   
     this.uploadtypeid = typeid;
     //alert(this.uploadtypeid);
   }



  brandList(){
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listbrand').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
       
        this.brandlists =  this.responseData.brandlist;
        
      }
      else
      {
        this.brandlists = '';
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  });
}

subcategoryList(bid){
   
  if(bid=="OTHER"){

    this.brandid='OTHER';

  }else{

    this.brandid=bid; 
   let serval={
     "cat_id": bid,
    };
   this.authService.postData(serval,'listSubcategory').then((result) => {
     this.responseData = result
 
     if( this.responseData.Ack == 1)
     {
      
       this.subcategorylists =  this.responseData.subcategorylist;
       
     }
     else
     {
      
       this.subcategorylists = '';
     }
    
   }, (err) => {
     
     console.log(err);
     
   });
  }
 }

 yearList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'getYears').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.yearlists =  this.responseData.Years;
      
    }
    else
    {
      this.yearlists = '';
    }
   
  }, (err) => {
    
    console.log(err);
    
  });
});
}




  currencyList(){
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listCurrency').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
       
        this.currencylists =  this.responseData.currencylist;
        
      }
      else
      {
        this.currencylists = '';
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  });
}

  
braceletList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'listbracelet').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.braceletlists =  this.responseData.braceletlist;
      
    }
    else
    {
      this.braceletlists = '';
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
  
  }else if(formData['type']== '2' && (formData['preferred_date']=="" || formData['time_slot_id']=="")){
    const alert = this.alertCtrl.create({
      title: 'Required!',
      subTitle: 'Please select action date and time!',
      buttons: ['OK']
    });
    alert.present();

  }/*else if(formData['brand']== 'OTHER'){
    
    if(formData['otherbrand']=='' && formData['othercategory']== ''){

      const alert = this.alertCtrl.create({
        title: 'Required!',
        subTitle: 'Please type other brand and category!',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }else if(formData['brand']!= 'OTHER'){
    
    if(formData['cat_id']== ''){

      const alert = this.alertCtrl.create({
        title: 'Required!',
        subTitle: 'Please select category!',
        buttons: ['OK']
      });
      alert.present();
    }
  }*/else{
    formData.currency=this.curcode;
    this.storage.ready().then(() => {
      localStorage.setItem('productData', JSON.stringify(formData));
      console.log('formdta',formData);
      this.navCtrl.push('Addproductstep2Page');
    });
 }
}




 auctiontimeid(tid)
  {
   //alert(tid);
    this.time_slot_id = tid;
    

  }

    

  selectDate(day,month, year)

  {
    
    // this.isSelected=!this.isSelected;
    console.log(day,month,year);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    return date < current;
  };
 /* selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 = "2018-05-31 00:00:00";
    var thisDate2 = "2018-06-02 00:00:00";
    this.eventList.forEach(event => {
      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);
      }
    });
  }*/






  getDaysOfMonth() {
  
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
 
   
    if(this.date.getMonth() == new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
  
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
      
    }
    
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }
  
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }
  
  
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
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


  selectcurrency(ccode,cimg){
    this.isShow =false;
  this.curcode=ccode;
  this.curimg=cimg;
  }


}