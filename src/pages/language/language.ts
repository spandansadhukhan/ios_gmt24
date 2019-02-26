import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the LanguagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  public selectedlanguage :any=1;
  constructor(public navCtrl: NavController, 
    public events: Events,
    public menu: MenuController,
    public navParams: NavParams) {
      events.publish('hideFooter', { isHidden: true});
  }

  ionViewDidLoad() {
    this.menu.enable(false, 'loggedOutMenu');
    console.log('ionViewDidLoad LanguagePage');
  }

  languagechange(language){
  
    // console.log('bbb',currency);
     if(language){
       this.selectedlanguage = language;
      // alert(this.selectedlanguage);
     }else{
       this.selectedlanguage = "1";
     }
     
   }
   changelanguage(){
     localStorage.setItem('language', JSON.stringify({"language":this.selectedlanguage}));
    
     this.navCtrl.setRoot('HomePage');
     
   }

   }

