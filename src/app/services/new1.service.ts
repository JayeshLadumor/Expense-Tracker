import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class New1Service {

  amount_array: Array<number>;
  category_array: Array<string>;
  array_date_amount: Array<{date: any, amount: number}>;
  userdata: string;
  username: string;

  constructor(private http: Http) { }

  sendemail(user) {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');
   return this.http.post('http://localhost:3000/users/forget', user, {headers: headers})
   .map(res => res.json());
   }
  Changepass(user) {
    console.log('New1Service=' + user.username);
    console.log('New1Service=' + user.password);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/change', user, {headers: headers})
      .map(res => res.json());
   }
}



