import { Component, OnInit } from '@angular/core';
import { New1Service } from '../services/new1.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private new1Service: New1Service,
              private flashmessage: FlashMessagesService,
              private router: Router) { }

  email: string;
  mail : boolean;

  ngOnInit() {

  }



  ForgetClk() {

    const user = {
      email : this.email
    }
    // console.log(user);
    this.new1Service.sendemail(user).subscribe(data => {
      if (data.success) {
        this.flashmessage.show(data.msg, {cssClass: 'alert-success', timeout: 1000});
        this.router.navigate(['login']);
      } else {
        this.flashmessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }
}
