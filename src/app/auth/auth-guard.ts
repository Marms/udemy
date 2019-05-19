import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authSvc: AuthService) {
  }

  canActivate(activeRouteSnap: ActivatedRouteSnapshot,
              routerStateSnap: RouterStateSnapshot) {
    return this.authSvc.isAuthentificated();
  }

  canLoad(route: Route) {
    return this.authSvc.isAuthentificated();
  }
}
