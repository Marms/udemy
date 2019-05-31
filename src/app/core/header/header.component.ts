import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Response} from '@angular/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import {Observable} from 'rxjs/Observable';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']

})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataSvc: DataStorageService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');

  }

  onSaveData() {
    this.dataSvc.saveRecipes().subscribe((response: Response) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataSvc.getRecipes();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
