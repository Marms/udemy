import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.reducer';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>) {
  }

  canActivate(activeRouteSnap: ActivatedRouteSnapshot,
              routerStateSnap: RouterStateSnapshot,
  ) {
    return this.getAuthenticated();
  }

  canLoad(route: Route) {
    return this.getAuthenticated();

  }

  getAuthenticated() {
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {
      console.log(authState.authenticated);
      return authState.authenticated;
    });
  }
}
