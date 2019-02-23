import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController,ToastController,Platform,ActionSheetController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import {  Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { normalizeURL } from 'ionic-angular';
/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  aForm : FormGroup;
  public id:any;
  public responseData:any;
  public countrylists:any;
  public statelists:any;
  public citylists:any;
  public currencylists:any;
  public fname:any;
  public lname:any;
  public image:any;
  public phonecode:any;
  public isShow:any;
  public curcode:any;
  public curimg:any;
  loguser:any;

  map: any;
  markers = [];
  location:any;
  lat:any;
  lang:any;
  markerlatlong:any;


  lastImage:any;
  imagename = [];
  
  uploadsuccess:any;
  uploadimages=[];
  productimages=[];
  address:any;
  autocompleteItems=[];
  GoogleAutocomplete:any;
  completeAddres:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public email:any;
  public first_name:any;
  public last_name:any;
  public gender:any;
  public countries:any;
  public male:any;
  public female:any;
  public state:any;
  public mobile_number:any;
  public number:any;
  public Bank:any;
  public Name:any;
  public preferred:any;
  public langu:any;
  public Preferred_Country:any;
  public Preferred_Currency:any;
  public Currency:any;
  public Civil_ID_Attachment:any;
  public Cancel:any;
  public Add_Photo:any;
  public Update:any;
  public this_field_is_required:any;
  public My_Profile:any;

  public user_id:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private file: File, 
    private filePath: FilePath,
    public platform: Platform,
    public toastCtrl:ToastController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private zone: NgZone
  ) {

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();

    this.aForm = builder.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'gender': [null, Validators.required],
      'phone': [null, Validators.required],
      'email': [null, Validators.required],
      'country': [null, Validators.required],
      'state': [null, Validators.required],
      //'city': [null, Validators.required],
      'ibanno': [null,null],
      'bankname': [null,null],
      'language_preference': [null,null],
      'country_preference': [null, Validators.required],
      'pickup_location': [null, null],
      //'currency_preference': [null, Validators.required],
      
    });

    this.storage.ready().then(()=>{
      this.storage.get('uid').then(val => {
        console.log(val);
        if(val){
          this.authService.getdetails({ user_id: val }).subscribe(res => {
           // console.log(res.UserDetails.first_name);
            this.aForm.controls['fname'].setValue(res.UserDetails.fname);
            this.aForm.controls['lname'].setValue(res.UserDetails.lname);
            this.aForm.controls['gender'].setValue(res.UserDetails.gender);
            this.aForm.controls['phone'].setValue(res.UserDetails.phone);
            this.aForm.controls['email'].setValue(res.UserDetails.email);
            this.aForm.controls['country'].setValue(res.UserDetails.country);
            this.aForm.controls['state'].setValue(res.UserDetails.state);
            //this.aForm.controls['city'].setValue(res.UserDetails.city);
            this.aForm.controls['ibanno'].setValue(res.UserDetails.ibanno);
            this.aForm.controls['bankname'].setValue(res.UserDetails.bankname);
            this.aForm.controls['language_preference'].setValue(res.UserDetails.language_preference);
            this.aForm.controls['country_preference'].setValue(res.UserDetails.country_preference);
            //this.aForm.controls['currency_preference'].setValue(res.UserDetails.currency_preference);
            this.fname=res.UserDetails.fname;
            this.lname=res.UserDetails.lname;
            this.image=res.UserDetails.profile_image;

            this.productimages=[];
            this.address=res.UserDetails.address;
            let imagesArray=res.UserDetails.images;
            if(imagesArray && imagesArray.length && imagesArray.length>0)
              {
                  for(let i=0;i<imagesArray.length;i++)
                  {
                      if(imagesArray[i])
                      {
                        this.productimages.push(imagesArray[i]);
                      }
                  }
              }



            if(res.UserDetails.currency_preference){
            this.curcode=res.UserDetails.currency_preference;
            this.curimg=res.UserDetails.currency_image;
            }else{

            this.curcode='KWD';
            this.curimg='kwd.jpg';
            }

            this.stateList(res.UserDetails.country);
            this.cityList(res.UserDetails.state);  
          });
        }
        
      });
    }).catch();





    let loading = this.loadingCtrl.create({
      content: 'Fetching your location...'
    });
    loading.present();
      this.geolocation.getCurrentPosition().then((resp) => {
      console.log('splocation',resp);
      this.lat = resp.coords.latitude;
      this.lang = resp.coords.longitude;
      this.initlocationMap(this.lat,this.lang);
      loading.dismiss();
    }).catch((error) => {
      loading.dismiss();
      console.log('Error getting location', error);
    });

    this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
}

  

  ionViewDidLoad() {
    this.ChangeToUserLaguage(this.selectedlanguage);
    this.countryList();
    this.currencyList();
  }
  ChangeToUserLaguage(lang){
    //alert(lang+'a')
      let serval={
        "language_id":lang,
       };
      /*this.authService.postData(serval,'changeLaguage').then((result) => {
        this.language = result.languages
        console.log('language',this.language.languages.top_brands);
        
       
      }, (err) => {
        
        console.log(err);
        
      });*/
      
      this.authService.changeLaguage(serval).subscribe(res=>{
        if(res.Ack==1){
        // loading.dismiss();
        console.log('AG',res.languages)
         console.log("splang",res.languages);
         this.email=res.languages.email;
         this.first_name=res.languages.first_name;
         this.last_name=res.languages.last_name;
         this.gender=res.languages.gender;
         this.male=res.languages.male;
         this.female = res.languages.female;
         this.countries = res.languages.country;
         this.state = res.languages.state;
         this.mobile_number= res.languages.mobile_number;
         this.number= res.languages.number;
         this.Bank= res.languages.Bank;
         this.Name= res.languages.Name;
         this.preferred= res.languages.preferred;
         this.langu= res.languages.langu;
         this.Preferred_Country= res.languages.Preferred_Country;
         this.Preferred_Currency= res.languages.Preferred_Currency;
         this.Currency= res.languages.Currency;
         this.Cancel= res.languages.Cancel;
         this.Civil_ID_Attachment= res.languages.Civil_ID_Attachment;
         this.Add_Photo= res.languages.Add_Photo;
         this.Update= res.languages.Update;

         this.this_field_is_required= res.languages.this_field_is_required;
          this.My_Profile = res.languages.My_Profile;
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
      this.phonecode =  this.responseData.phonecode;
    }
    else
    {
     
      this.statelists = '';
      this.phonecode =  '';
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






onSubmit(formData) {

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();

  if (!this.aForm.valid) {
    loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Update Failed!',
      subTitle: "Please fill all the details.",
      buttons: ['OK']
    });
    alert.present();
  }else{
  
  this.storage.get('uid').then(val => {
  formData['user_id'] = val;
  formData['currency_preference']=this.curcode;
  formData['address']=this.address;
  formData['my_latitude']=this.lat;
  formData['my_longitude']=this.lang;
  formData.image =  this.uploadimages.toString();
  this.authService.updateprofile(formData).subscribe(res => {
   if (res.Ack == 1) {
    loading.dismiss();
    localStorage.setItem('selectedcurrency', JSON.stringify({"selectedcurrency":this.curcode}));
      const alert = this.alertCtrl.create({
        title:'Success!',
        subTitle: res.msg,
        buttons: ['OK']
      });
      alert.present();
    } 
    else {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: res.msg,
        buttons: ['OK']
      });
      alert.present();
    }
  }, err => {
    loading.dismiss();
    console.log(err);
  });
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

selectcurrency(ccode,cimg){
  this.isShow =false;
this.curcode=ccode;
this.curimg=cimg;
}



initlocationMap(lat,lang) {
    

  var point = {lat: lat, lng: lang};
 // alert(JSON.stringify(point));
  let divMap = (<HTMLInputElement>document.getElementById('map'));
  this.map = new google.maps.Map(divMap, {
  center: point,
  zoom: 15,
  disableDefaultUI: true,
  draggable: true,
  zoomControl: true
  });

   var marker = new google.maps.Marker({
    map: this.map,
    position: point,
    draggable: true,
    });
    this.markers.push(marker);

  // if(item.description){

  
     
  // }else{ 
     let geocoder = new google.maps.Geocoder;
    let latlng = {lat: lat, lng: lang};
    geocoder.geocode({'location': latlng}, (results, status) => {

      if (status == 'OK')
      {
          this.lat = lat;
          this.lang = lang;
          this.address = results[0].formatted_address;
         // alert(this.address);
      }
      else
      {
       // alert(status);
      }

    });
  //}

    google.maps.event.addListener(marker, 'dragend', () =>{ 
    let geocoder = new google.maps.Geocoder;
    let latlng = {lat: marker.position.lat(), lng: marker.position.lng()};
    geocoder.geocode({'location': latlng}, (results, status) => {

      if (status == 'OK')
      {
          this.lat = marker.position.lat();
          this.lang = marker.position.lng();
          this.address = results[0].formatted_address;
          //alert(this.address);
      }
      else
      {
       // alert(status);
      }
       
    });

  });
    

}

updateSearchResults() {
    
  if (!this.aForm.value.pickup_location) {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.aForm.value.pickup_location},
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          //console.log('sp',prediction);
          this.autocompleteItems.push(prediction);
        });
      });
    });
}
 
searchaddress(item){

  this.autocompleteItems = [];
  this.completeAddres = item.description;
  this.address=item.description;
  this.aForm.get('pickup_location').setValue(this.completeAddres);
    let geocoder = new google.maps.Geocoder;
    geocoder.geocode({'placeId': item.place_id}, (results, status) => {
   // if(status === 'OK' && results[0]){
      //this.initlocationMap(22.5957689,88.26363939999999);
      let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
      };
      let marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: this.map,
        draggable: true,
      });
     
      this.markers.push(marker);
      this.map.setCenter(results[0].geometry.location);
    //}
 

 google.maps.event.addListener(marker, 'dragend', () =>{ 
  let geocoder = new google.maps.Geocoder;
  let latlng = {lat: marker.position.lat(), lng: marker.position.lng()};
  geocoder.geocode({'location': latlng}, (results, status) => {

    if (status == 'OK')
    {
        this.lat = marker.position.lat();
        this.lang = marker.position.lng();
        this.address = results[0].formatted_address;
        this.aForm.get('pickup_location').setValue(this.address);

        //alert(this.address);
    }
    else
    {
     // alert(status);
    }
     
  });
});
});

}



 //image upload

 presentActionSheet(uploadid) {
   //alert(uploadid);
  let actionSheet = this.actionSheetCtrl.create({
    enableBackdropDismiss: true,
    buttons: [
      {
        text: 'Take a picture',
        icon: 'camera',
        handler: () => {
          this.uploadFromCamera(this.camera.PictureSourceType.CAMERA,uploadid);
        }
      }, {
        text: 'From gallery',
        icon: 'images',
        handler: () => {
          this.uploadFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY,uploadid);
        }
      }
    ]
  });
  actionSheet.present();
}



uploadFromCamera(sourceType,uploadid){

  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName),uploadid);
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName),uploadid);
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });

}

private createFileName(currentName) {
  var d = new Date(),
  n = d.getTime(),
  newFileName=currentName;
  return newFileName;
}

private copyFileToLocalDir(namePath, currentName, newFileName,uploadid) {
 console.log("CURRENTFILENAME",currentName);
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    console.log("NEWFILENAMEEEEEE",this.lastImage);
    if(uploadid == '1'){
      //alert('ok');
      this.uploadImage_profile();
    }else{
      //alert('ok1');
      this.uploadImage();
    }
    
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

public pathForImage(img) {
  console.log("IMAGGGEGGEGGEGE",img);
  if (img === null) {
    return '';
  } else {
    return normalizeURL(cordova.file.dataDirectory + img);
  }
}

public uploadImage() {
  // Destination URL
  var url = "https://thegmt24.com/webservice/frontend/userimageinsert_app";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "photo",
    photo: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {
    'photo':filename,
 // 'user_id':uid
     }
   // params : {'fileName': filename}
  };
  console.log("OPTIONS",options);
  const fileTransfer:FileTransferObject = this.transfer.create();
 
  let loading = this.loadingCtrl.create({
    content: 'Uploading Please Wait...'
  });
  loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    
    this.uploadsuccess=JSON.parse(data.response);

    console.log('UPLOADsp',this.uploadsuccess);

    if(this.uploadsuccess.ack==1){
      loading.dismiss();
      this.uploadimages.push(this.uploadsuccess.image);
      this.productimages.push(this.uploadsuccess.link);
      console.log('spimages',this.uploadimages);
      console.log('spimagesshow',this.productimages);
      this.presentToast('Image succesful uploaded.');
      
    }else{

      loading.dismiss();
      this.presentToast('Time out. Try again.');
    }
    
  }, err => {
    console.log("Error",err);
    loading.dismiss();
    this.presentToast('Error while uploading file.');
  });
}

//end image upload


remove_image(id)
{
 // alert(id)
 
  let alert = this.alertCtrl.create({
    title: 'Remove Image',
    message: 'Are you sure to remove image?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass:'icon-color',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        cssClass:'icon-color',
        handler: data => {
          
            this.uploadimages.splice(id, 1);
            this.productimages.splice(id,1);
          
        }
      }
    ]
  });

  alert.present();
  //alert(id)
}


public uploadImage_profile() {

  this.loguser =  JSON.parse(localStorage.getItem('userData'));
  this.user_id=this.loguser.user_id;
  // Destination URL
  var url = "https://thegmt24.com/webservice/frontend/updateProfilePhoto_app";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "photo",
    photo: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {
    'photo':filename,
    'user_id':this.user_id
     }
   // params : {'fileName': filename}
  };
  console.log("OPTIONS",options);
  const fileTransfer:FileTransferObject = this.transfer.create();
 
  let loading = this.loadingCtrl.create({
    content: 'Uploading Please Wait...'
  });
  loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
   
    this.uploadsuccess=JSON.parse(data.response);
    if(this.uploadsuccess.Ack==1){
      loading.dismiss();
      this.image=this.uploadsuccess.image;
      this.presentToast('Image succesful uploaded.');
      
    }else{

      loading.dismiss();
      this.presentToast('Time out. Try again.');
    }



  }, err => {
    console.log("Error",err);
    loading.dismiss();
    this.presentToast('Error while uploading file.');
  });
}




//spandan

}
