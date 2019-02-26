import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ActionSheetController,ToastController, LoadingController ,Platform } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { identifierModuleUrl } from '@angular/compiler';
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
import { normalizeURL } from 'ionic-angular';

/**
 * Generated class for the Addproductstep3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-addproductstep3',
  templateUrl: 'addproductstep3.html',
})
export class Addproductstep3Page {
  public loading:any;
  pForm: FormGroup;
  public logproduct:any;
  public logproduct1:any;
  public pid:any;
  public responseData:any;
  lastImage:any;
  imagename = [];
  public bikeimages = [];
  selectedValue=[];
  uploadsuccess:any;
  uploadimages=[];
  productimages=[];

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public size;any;
  public location:any;
  public Work_Hours:any;
  public Product_Image:any;
  public Upload_Image:any;
  public save:any;
  public optional:any;
  public this_field_is_required:any;
  public add_product:any;
  public auction:any;

  address:any;
  autocompleteItems=[];
  GoogleAutocomplete:any;
  completeAddres:any;
  map: any;
  markers = [];
  lat:any;
  lang:any;
  markerlatlong:any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    //private builder: FormBuilder,
    private fb: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private file: File, 
    private filePath: FilePath,
    public platform: Platform,
    public toastCtrl:ToastController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer,
    private geolocation: Geolocation,
    private zone: NgZone) {

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();

      this.pForm = fb.group({
        'size': [null, Validators.required],
        'location': ["",""],
        'work_hours': ["",""],
        
        
      });

    //for current location
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






      //for language
      this.languages = JSON.parse(localStorage.getItem('language'));
        if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addproductstep3Page');
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
         this.size=res.languages.size;
         this.add_product=res.languages.add_product;
         this.auction=res.languages.auction;

         this.location=res.languages.location;
         this.Work_Hours=res.languages.Work_Hours;
         this.Product_Image = res.languages.Product_Image;
         this.Upload_Image = res.languages.Upload_Image;
         this.save = res.languages.save;
         this.optional = res.languages.optional;
         this.this_field_is_required= res.languages.this_field_is_required;
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

  onSubmit(formData) {
    
    if (!this.pForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Product Add Failed!',
        subTitle: "Please fill all * fields.",
        buttons: ['OK']
      });
      alert.present();
    }else if(this.uploadimages.length > 5){

      const alert = this.alertCtrl.create({
        title: 'Product Add Failed!',
        subTitle: "Maximum 5 images can upload",
        buttons: ['OK']
      });
      alert.present();

    }else if(this.uploadimages.length < 1){

      const alert = this.alertCtrl.create({
        title: 'Product Add Failed!',
        subTitle: "Please upload Image.",
        buttons: ['OK']
      });
      alert.present();

    } else{

      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();

    //  console.log(formData);
    this.storage.get('uid').then(val => {
    formData['user_id']=val;
    this.logproduct1 =  JSON.parse(localStorage.getItem('productData'));
    this.logproduct =  JSON.parse(localStorage.getItem('productData2'));
    formData['type']=this.logproduct1.type;
    formData['brand']=this.logproduct1.brand;
    formData['cat_id']=this.logproduct1.cat_id;
    formData['otherbrand']=this.logproduct1.otherbrand;
    formData['othercategory']=this.logproduct1.othercategory;
    formData['breslet_type']=this.logproduct1.breslet_type;
    formData['model_year']=this.logproduct1.model_year;
    formData['currency']=this.logproduct1.currency;
    formData['description']=this.logproduct1.description;
    formData['price']=this.logproduct1.price;
    formData['movement']=this.logproduct.movement;
    formData['gender']=this.logproduct.gender;
    formData['reference']=this.logproduct.reference;
    formData['status']=this.logproduct.status;
    formData['owner_number']=this.logproduct.owner_number;
    formData['country']=this.logproduct.country;
    formData['state']=this.logproduct.state;
    formData['city']=this.logproduct.city;
    formData['date_of_purchase']=this.logproduct.date_of_purchase;
    formData.image =  this.uploadimages.toString();
    console.log('spandanproduct',formData);
     this.authService.productadd(formData).subscribe(res=>{
      
       if(res.Ack==1){
        loading.dismiss();
        //this.uploadImage(res.lastid);
        
        console.log(res);
         const alert = this.alertCtrl.create({
           title: res.msg,
           buttons: ['OK']
         });
        alert.present();

          if(res.type==1){
            if(res.utype == '1'){
              if(res.certified_user == 1){
              this.pid=res.lastid;
              //this.navCtrl.push('ProductpaymentPage');
              this.navCtrl.push('MyproductPage');
            }else{
              this.navCtrl.push('MyproductPage');
            }
          }else{
            this.navCtrl.push('MyproductPage');
          }
          }
          if(res.type==2){

            this.navCtrl.push('MyauctionPage');

          }

       }else if(res.Ack==0){
        loading.dismiss();
        console.log(res);
        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
      alert.present();
       }
      },err=>{
        loading.dismiss();
       console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });
    });  
    }
  }



  //image upload

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    actionSheet.present();
  }



  uploadFromCamera(sourceType){

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
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });

  }

  private createFileName(currentName) {
    var d = new Date(),
    n = d.getTime(),
   // newFileName=n+".jpg";
    newFileName=currentName;
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
   console.log("CURRENTFILENAME",currentName);
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log("NEWFILENAMEEEEEE",this.lastImage);
      this.uploadImage();
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
      //return cordova.file.dataDirectory + img;
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "https://thegmt24.com/webservice/frontend/imageinsert_app";
   
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
      //'product_id':lid
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

  
  change(e, type){
    console.log(e);
    console.log(type);
    
    if(e){
      this.selectedValue.push(type.id);
    }
    else{
    
     let index = this.selectedValue.indexOf(type.id);

     this.selectedValue.splice(index, 1);
    }
    console.log(this.selectedValue)
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
          alert(status);
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
          alert(status);
        }
         
      });
  
    });
      
  
  }

  updateSearchResults() {
    
    if (!this.pForm.value.location) {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.pForm.value.location},
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
    this.pForm.get('location').setValue(this.completeAddres);
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
          this.pForm.get('location').setValue(this.address);
  
          //alert(this.address);
      }
      else
      {
        alert(status);
      }
       
    });
  });
  });
  
  }






}
