import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const password = f.value.password;
    const email = f.value.email;
    console.log( password + '' + email);
    this.authSvc.signupUser(email, password);
  }
}
