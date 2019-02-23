import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform ,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Events,LoadingController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public footerIsHidden: boolean = false;
  rootPage:any;
  public id:any;
  public loguser:any;
 //public type:any;
  public istype:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public profile:any;
  public change_password:any;
  public Change_Currency:any;
  public Change_Language:any;
  public My_Loyalty:any;
  public notificationsss:any;
  public subscriptionsss:any;
  public subscribed_list:any;

  public add_product:any;
  public my_product:any;
  public favorite_or_wishlist:any;
  public my_auction:any;
  public Purchased_or_Won_Auction:any;
  public My_Interest:any;
  public potential_buyers:any;

  public notification_settings:any;
  public messageses:any;
  public logouts:any;
  public Sign_In:any;
  public signups:any;
  public homes:any;
  public auction:any;
  public watches:any;
  public shops:any;
  token:any;
  about_us:any;
  responseData:any;
  count:any;
  //refreshIntervalId:any;

  public path:any;
  constructor(
    public platform: Platform,
    private storage: Storage, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public alertCtrl: AlertController,
    private push: Push,) {

      this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)

    //localStorage.removeItem('language');



    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
   
      platform.ready().then(()=>{

        //keyboard footer off
        window.addEventListener('keyboardDidHide', () => {
          document.body.classList.remove('keyboard-is-open');
          // Describe your logic which will be run each time keyboard is closed.
      });
      window.addEventListener('keyboardDidShow', (event) => {
        // Describe your logic which will be run each time when keyboard is about to be shown.
        document.body.classList.add('keyboard-is-open');
      });
       //end
        events.subscribe('hideFooter', (data) => {
          this.footerIsHidden = data.isHidden;
        })
      this.initPushNotification();
      this.storage.get('uid').then(val => {
        this.id =val;
   
            if(this.id){
              events.publish('hideFooter', {isHidden: false});
              this.nav.setRoot('HomePage');

              
              
        }else{
         
          events.publish('hideFooter', {isHidden: true});
          this.nav.setRoot('AdvertisePage');
        }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

     setInterval(() => {
      this.storage.get('uid').then(val => { 
      this.notificationcount(val);
      
    });
    }, 3000);
 

})



  }











  
  
  ChangeToUserLaguage1(lang){
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
         this.profile=res.languages.profile;
         this.change_password=res.languages.change_password;
         this.Change_Currency=res.languages.Change_Currency;
         this.Change_Language = res.languages.Change_Language;
         this.My_Loyalty = res.languages.My_Loyalty;
         this.notificationsss = res.languages.notifications;
         this.subscriptionsss = res.languages.subscriptions;
         this.subscribed_list = res.languages.subscribed_list;
         this.add_product = res.languages.add_product;
         this.my_product = res.languages.my_product;
         this.favorite_or_wishlist = res.languages.favorite_or_wishlist;
         this.my_auction = res.languages.my_auction;
         this.Purchased_or_Won_Auction = res.languages.Purchased_or_Won_Auction;
         this.My_Interest = res.languages.My_Interest;
         this.potential_buyers = res.languages.potential_buyers;

         this.notification_settings = res.languages.notification_settings;
         this.messageses = res.languages.messages;
         this.logouts = res.languages.logout;
         this.Sign_In = res.languages.Sign_In;
         this.signups = res.languages.signup;
         this.homes = res.languages.home;
         this.auction = res.languages.auction;
         this.watches = res.languages.watches;
         this.shops = res.languages.shops;
         this.about_us=res.languages.about_us;
         

         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }
  public logout(){
    this.storage.ready().then(() => {
     // const data=localStorage.getItem("userData");
    localStorage.removeItem('userData');
    localStorage.removeItem('selectedcurrency');
    localStorage.removeItem('language');
    localStorage.setItem('userData',"");
    this.storage.set("uid","");
    this.nav.setRoot('LoginnewPage');
   // clearInterval(this.refreshIntervalId);
  });
}

abc(){
 // alert("jdh")
  this.loguser =  JSON.parse(localStorage.getItem('userData'));   
  if(this.loguser){
    this.events.publish('hideFooter', {isHidden: false});
  if(this.loguser.user_type=="1"){
    this.istype=1;
  }else if(this.loguser.user_type=="2"){
    this.istype=2;
  }else if(this.loguser.user_type=="3"){
    this.istype=3;
  }
  }

  this.languages = JSON.parse(localStorage.getItem('language'));
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }

}

// ChangeToUserLaguage()
// {
//   this.loguser =  JSON.parse(localStorage.getItem('userData'));   
//   if(this.loguser){
//     this.events.publish('hideFooter', {isHidden: false});
//   if(this.loguser.user_type=="1"){
//     this.istype=1;
//   }else if(this.loguser.user_type=="2"){
//     this.istype=2;
//   }else if(this.loguser.user_type=="3"){
//     this.istype=3;
//   }
//   }
// }
public home(){
   
  this.nav.setRoot('HomePage');
 
} 
 
public allwatches(){

  this.nav.setRoot('SearchPage');
}

public allauctions(){

  this.nav.setRoot('AuctionlistPage');
}

public allshops(){

  this.nav.setRoot('AllshoplistPage');
}

public settings(){

  this.nav.push('SettingsPage');
}
  public myaccount(){
   
    this.nav.push('MyaccountPage');
     
  } 


  public changepassword(){ 
  
    this.nav.push('ChangepasswordPage');
    
    }

  public changecurrency(){ 
  
    this.nav.push('CurrencychangePage');
    
    }
    public changelanguage(){ 
  
      this.nav.push('LanguagePage');
      
      }
    
  public notifications(){ 
  
      this.nav.setRoot('NotificationPage');
      
      }

  public addproduct(){ 

    this.nav.push('AddproductPage');
    
    }  
    public myproduct(){ 

      this.nav.push('MyproductPage');
      
      }


      public myauction(){ 

        this.nav.push('MyauctionPage');
        
        }

       public wishlist()
        {
          this.nav.push ('WishlistPage');
        }

        public purchase()
        {
          this.nav.push('ListOrderBuyerPage');
        }

        public myInterest()
        {
          this.nav.push('MyInterestPage');
        }

        public customerInterest()
        {
          this.nav.push('CustomerInterestPage');
        }




        public liveauction()
        {
          this.nav.push('LiveAuctionPage');
        }
        public loyalty()
        {
          this.nav.push('LoyaltyPage');
        }

        public messages()
        {
          this.nav.push('MessageListingPage');
        }


        public subscriptions(){

          this.nav.push('AllsubscriptionsPage');
        }

        public subscribedlist(){

          this.nav.push('SubscribedlistPage');

        }

        public signin(){

          this.nav.setRoot('LoginnewPage');
        }

        public signup(){

          this.nav.setRoot('SignupPage');
        }


        public aboutus(id){

          //alert(id);
          this.nav.push('CmsPage',{"id":id});
        }

//for push notification
        initPushNotification() {
          if (!this.platform.is('cordova')) {
            console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
            return;
          }
          const options: PushOptions = {
            android: {
              senderID: '242512247505',
              icon: "assets/img/icon.png",
              sound:true,
              vibrate:true,
              messageKey:'message',
              titleKey:'body',
              forceShow:true,
            },
            ios: {
              alert: 'true',
              badge: false,
              sound: 'true'
            },
            windows: {}
          };
          const pushObject: PushObject = this.push.init(options);
        
          pushObject.on('registration').subscribe((registration: any) => {
            console.log('Device registered', registration);
      
      
            localStorage.setItem('TOKEN', registration.registrationId);
      
            this.token= localStorage.getItem('TOKEN');
            
          });
          pushObject.on('notification').subscribe((data: any) => {
            console.log('message -> ' + data.body);
            console.log(data.additionalData.foreground);
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
              console.log(data.additionalData.foreground);
              // if application open, show popup
              let confirmAlert = this.alertCtrl.create({
                title: 'New Notification',
                message: data.message,
                buttons: [{
                  text: 'Ignore',
                  role: 'cancel'
                }, {
                  text: 'View',
                  handler: () => {
                    //TODO: Your logic here
                    this.nav.setRoot('NotificationSettingsPage', { message: data.message });
                  }
                }]
              });
              confirmAlert.present();
            } else {
              //if user NOT using app and push notification comes
              //TODO: Your logic on click of push notification directly
              //this.nav.setRoot('NotificationSettingsPage', {message: data.message });
              console.log('Push notification clicked');
            }
          });
          pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
        
          
         
        }
        
//for push notification end


notificationcount(id){

  let serval={
    "user_id": id,
  }
  
  this.authService.postData(serval,'notiount').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.count =  this.responseData.count;
    }
    else
    {
      
      this.count = 0;
      
    }
   
  }, (err) => {
    
    console.log(err);
    
  });

}






}