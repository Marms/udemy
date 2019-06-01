import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipeState';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDzGez2rkFAT-r16vUQG1sWWSJLddQNTzc',
      authDomain: 'ng-recipeState-book-5cc84.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
