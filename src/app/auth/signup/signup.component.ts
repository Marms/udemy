import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const password = f.value.password;
    const email = f.value.email;
    this.store.dispatch(new fromAuth.TrySignup({username: email, password: password}));
    }
}
