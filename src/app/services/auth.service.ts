import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  username: string;
  // amount_array: Array<number>;
  // category_array: Array<string>;
  // array_date_amount: Array<{date: any, amount: number}>;

  constructor(private http: Http) {
    if (this.loggedIn()) {
      const m = JSON.parse(localStorage.getItem('user'));
      this.username = m.username;
    }
  }

  loadData() {
    const m = JSON.parse(localStorage.getItem('user'));
    this.username = m.username;
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  enterExpense(expense) {                                                                                // new
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/expenses/addexpense', expense, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getExpense() {                                                                     // NEW
    const headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/expenses/showexpenses?username=' + this.username, {headers: headers})
      .map(res => res.json());
  }
}
