import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
   const res = firebase.auth().signInWithEmailAndPassword(email, password)
     .then(
       response => {
         this.router.navigate(['/']);
         this.getToken();
       }
     )
      .catch(
        error => console.log(error)
      );

   console.log(res);
  }

  /**
   * On ne peut pas utiliser cette methode pour retourner un token
   * car elle retourne une promise et est donc executer de manière asynchrone
   */
  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    // il y a une possibilite que le token soit expire
    return this.token;
  }

  logOut() {
    firebase.auth().signOut();
    this.token = null;
  }
  isAuthentificated() {
    return this.token != null;
  }
}
