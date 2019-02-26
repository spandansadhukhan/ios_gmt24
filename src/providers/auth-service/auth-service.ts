import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
//import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Config } from './../../config';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  apiUrl = Config.baseUrl;
  constructor(
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }
  private _serverError(err: any) {
    console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
      // if you're using lite-server, use the following line
      // instead of the line above:
      //return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }

  public details ;
  postData(credentials, type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //console.log(credentials);
    //console.log(type);
    return new Promise((resolve, reject) => {
     // let headers = new Headers();

      this.http.post(this.apiUrl + type, JSON.stringify(credentials))
        .subscribe(res => {
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          //console.log(err);
          reject(err);
          loading.dismiss();
        });
    });

  }

  signup(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'userSignup',data).map((res:Response)=>{
      return res.json();
    });
  }

  changeLaguage(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'changeLaguage',data).map((res:Response)=>{
      return res.json();
    });
  }

  countrylist(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'listcountry',data).map((res:Response)=>{
      return res.json();
    });
  }

  satelist(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'liststate',data).map((res:Response)=>{
      return res.json();
    });
  }

  braceletlist(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'listbracelet',data).map((res:Response)=>{
      return res.json();
    });
  }

  yearlist(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'getYears',data).map((res:Response)=>{
      return res.json();
    });
  }

  movementlist(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'getmovement',data).map((res:Response)=>{
      return res.json();
    });
  }

  sellerlist(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'listshops',data).map((res:Response)=>{
      return res.json();
    });
  }



  statuslist(data:object):Observable<any>{
   // console.log(data);
    return this.http.post(this.apiUrl +'liststatus',data).map((res:Response)=>{
      return res.json();
    });
  }

  otpverify(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'tomobileverifying',data).map((res:Response)=>{
      return res.json();
    });
  }

  login(data: object): Observable<any> {
    //console.log(data);
    return this.http.post(this.apiUrl +'userLogin', data).map((res: Response) => {
      return res.json();
    });
  }

  socialLogin(data: object, type : any): Observable<any> {
    console.log(this.apiUrl + type , JSON.stringify(data));
    return this.http.post(this.apiUrl + type, data).map((res: Response) => {
      return res.json();
    })
    .do(data => console.log('server data:', data))  // debug
    .catch(this._serverError);
  }

  resendotp(data: object): Observable<any> {
    //console.log('spandan',data);
    return this.http.post(this.apiUrl +'resend_app', data).map((res: Response) => {
      return res.json();
    });
  }

  forgetpass(data: object): Observable < any > {
    //console.log(data);
    let requestforgetoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'forgetpassword',
      body: JSON.stringify(data)
    });
   // console.log(requestforgetoptions);
    return this.http.request(new Request(requestforgetoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
   }

   getdetails(data: object): Observable<any> {
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'userprofile',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });

  }

  updateprofile(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'updateProfile_app', data).map((res: Response) => {
      return res.json();
    });
  }

  changepass(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'CheckoldPassword',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

  productadd(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'addProductNew_app',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }


  UserSubscriptionpayment(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'UserSubscriptionpayment',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }


  auctionuploapayment(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'auctionuploapayment',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

  auctionwinnerpayment(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'UserAuctionpayment',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

  productuploapayment(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'userpaymentforupload',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

  userpaymentfortop(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'userpaymentfortop',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

  sendauctionadd(data: object): Observable<any> {

    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'auctionapproval',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }
  /*productadd(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'addProductNew_app',data).map((res:Response)=>{
      return res.json();
    });
  }*/


  getData(type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //console.log(type);
    return new Promise((resolve, reject) => {
      //let headers = new Headers();

      this.http.get(this.apiUrl + type)
        .subscribe(res => {
          //let details = res;
          //console.log(details);
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          console.log(err);
          reject(err);
          loading.dismiss();
        });
    });

  }

  addmessage(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'addmessage',data).map((res:Response)=>{
      return res.json();
    });
  }

  removeimage(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'removeImage_app', data).map((res: Response) => {
      return res.json();
    });
  }


  notifysettings(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'notifysettings',data).map((res:Response)=>{
      return res.json();
    });
  }

  getvideo(data:object):Observable<any>{
    //console.log(data);
    return this.http.post(this.apiUrl +'getvideo',data).map((res:Response)=>{
      return res.json();
    });
  }

}
