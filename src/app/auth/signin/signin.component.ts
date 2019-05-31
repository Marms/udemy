import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private  store: Store<fromApp.AppState>) { }

  ngOnInit() {}

  onSubmit(f: NgForm) {
    const password = f.value.password;
    const email = f.value.email;
    this.store.dispatch(new fromAuth.TrySignin({username: email, password: password}));
  }

}
