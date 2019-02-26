import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController ,LoadingController} from 'ionic-angular';

import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
/**
 * Generated class for the AdvertisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html',
})
export class AdvertisePage {

  public  responseData:any;
  public  videoList:any;
  length:any;
  counter=0;
  srcs:any;
 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
   
    public loadingCtrl: LoadingController,
    public authService:AuthServiceProvider,
  ) {
   
    
  }

  ionViewDidLoad() {
    this.menu.enable(false, 'loggedOutMenu');
    this.getvideos();
   
    console.log('ionViewDidLoad AdvertisePage');
  }
 
  getvideos(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    
    loading.present();
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    
    this.authService.getvideo({}).subscribe((result) => {
     
      this.responseData = result
      
      console.log('aruvideo1',this.responseData.videolist);
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
       
        this.videoList =  this.responseData.videolist;
        this.length = this.videoList.length;
        
        //alert( this.counter);
        this.srcs = this.responseData.videolist[this.counter].video;
       
        //alert( this.counter)
        //alert(this.srcs);
        console.log('aruvideo',this.srcs);
        
      } else
      {
        loading.dismiss();
        this.videoList ="";
      }
     
    }, err => {
      loading.dismiss();
      console.log(err);
      
    });
  }

  videoEnded(){
    if(this.length > this.counter){
      this.counter++;
      this.getvideos();
    }else{
      this.counter=0;
      alert();
      this.getvideos();
    }
    
  }


  
  skip() {
    this.navCtrl.push("LoginnewPage");
  }

}
