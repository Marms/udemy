import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.store.dispatch(new fromAuth.TrySignin({username: 'test@test.fr', password: 'test59'}));

  }

  onSubmit(f: NgForm) {
    const password = f.value.password;
    const email = f.value.email;
    this.store.dispatch(new fromAuth.TrySignin({username: email, password: password}));
  }

}
