import { Injectable } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
// import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    //private afAuth: AngularFireAuth
  ) {
    console.log('Hello AuthProvider Provider');
  }

  // loginWithEmail(credetnails){
  //   return Observable.create(observer =>{
  //     this.afAuth.auth.signInWithEmailAndPassword(credetnails.email,credetnails.password)
  //     .then(authData=>{
  //       observer.next(authData);
  //     })
  //     .catch(error=>{
  //       observer.error(error);
  //     });
  //   });
  // }

  // logout(){
  //   return Observable.create(observer =>{
  //     this.afAuth.auth.signOut().then(()=>observer.next()).catch(error=>{
  //       observer.error(error);
  //     });
  //   });
  // }

}
