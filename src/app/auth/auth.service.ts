import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.action';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (user) => {
          this.store.dispatch(new fromAuth.SignUp());
          this.getToken();
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    const res = firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new fromAuth.SignIn());

          this.router.navigate(['/']);

          this.getToken();        }
      )
      .catch(
        error => console.log(error)
      );
  }

  private getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.store.dispatch(new fromAuth.SetToken(token)));
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new fromAuth.Logout());
  }
}
