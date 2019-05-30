import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Response} from '@angular/http';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']

})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;

  constructor(private dataSvc: DataStorageService,
              private authSvc: AuthService,
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
    this.authSvc.logOut();
  }

}
