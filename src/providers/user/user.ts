import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './../../config';
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
    console.log(Config.baseUrl)
  }

}
