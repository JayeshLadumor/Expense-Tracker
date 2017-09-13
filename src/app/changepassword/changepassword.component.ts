import { Component, OnInit } from '@angular/core';
import {New1Service} from '../services/new1.service';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  password: any;
  userdata: any;
  username: any;
  change_form: FormGroup;
  constructor(private new1Service: New1Service,
              private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router) { }
  ngOnInit() {
    this.change_form = new FormGroup({
      'password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required)
    });
  }
  ChangePassword() {
    this.userdata = JSON.parse(localStorage.getItem('user')).username;
     console.log('Before' + this.userdata);
     const user = {
     username: this.userdata,
     password : this.change_form.get('password').value
     }
     console.log(user.password);
    this.new1Service.Changepass(user).subscribe(data => {
      if (data.success) {
       /* this.authService.logout();*/
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['profile']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });
  }
}
